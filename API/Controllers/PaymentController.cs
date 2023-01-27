using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using API.Entities;
using API.Entities.OrderAggregate;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly StoreContext _storeContext;
        private readonly PaymentService _paymentService;
        private readonly IConfiguration _config;
        public PaymentController(PaymentService paymentService, StoreContext storeContext, IConfiguration config)
        {
            _config = config;
            _paymentService = paymentService;
            _storeContext = storeContext;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            var basket = await _storeContext.Baskets
                            .RetrieveBasketWithItems(User.Identity.Name)
                            .FirstOrDefaultAsync();
            if(basket == null)
            {
                return NotFound();
            }

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

            if (intent == null)
            {
                return BadRequest(new ProblemDetails { Title = "Problem creating Payment Intent" });
            }

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;
            
            _storeContext.Update(basket);

            var result = await _storeContext.SaveChangesAsync() > 0;
            if(!result)
            {
                return BadRequest(new ProblemDetails { Title = "Problem updating Basket with Intent" });
            }

            return basket.MapBasketToDto();
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _config["StripeSettings:WhSecret"]);

            var charge = (Charge)stripeEvent.Data.Object;

            var order = await _storeContext.Orders.FirstOrDefaultAsync(x=>x.PaymentIntentId == charge.PaymentIntentId);

            if(charge.Status == "succeeded") order.OrderStatus  =OrderStatus.PaymentReceived;

            await _storeContext.SaveChangesAsync();

            return new EmptyResult();
        }
    }
}