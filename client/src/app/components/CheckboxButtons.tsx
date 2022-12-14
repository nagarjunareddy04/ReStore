import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
    const [checkedItems, SetCheckedItems] = useState(checked || []);
    function handleChecked(value: string) {
        const currentIdex = checkedItems.findIndex(item => item === value); 
        let newChecked: string[] = [];
        if(currentIdex === -1){
            newChecked = [...checkedItems, value]
        }else{
            newChecked = checkedItems.filter(item=> item != value);
        }

        SetCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <>
            <FormGroup>
                {items.map(item => (
                    <FormControlLabel 
                        control={<Checkbox
                            checked={checkedItems.indexOf(item) != -1}
                            onClick={()=>handleChecked(item)}
                            />} 
                        label={item} 
                        key={item} />
                ))}
            </FormGroup>
        </>
    )
}