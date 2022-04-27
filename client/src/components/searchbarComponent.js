import { 
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
} from "@reach/combobox";



function Searchbar(){

    function selectPlace(){

    }

    return(
        <div className="serch-bar-component">
            <Combobox onSelect={selectPlace}>
                <ComboboxInput>
                
                </ComboboxInput>
                <ComboboxPopover>
                    
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}