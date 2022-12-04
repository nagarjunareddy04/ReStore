import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function GetValidationErrors() {
        agent.TestErrors.getValError().then(() => console.log("should not see this"))
            .catch(error => setValidationErrors(error))
    }

    return (
        <>
            <Container>
                <Typography gutterBottom variant="h2">
                    Errors for testing purposes
                </Typography>
                <ButtonGroup fullWidth>
                    <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Eror</Button>
                    <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Eror</Button>
                    <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Eror</Button>
                    <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Eror</Button>
                    <Button variant="contained" onClick={GetValidationErrors}>Test Val Eror</Button>
                </ButtonGroup>
                {
                    validationErrors.length > 0 &&
                    <Alert severity="error">
                        <AlertTitle>Validation Errors</AlertTitle>
                        <List>
                            {validationErrors.map(error => (
                                <ListItem key={error}>
                                    <ListItemText>{error}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Alert>
                }
            </Container>
        </>
    )
}