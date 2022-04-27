import { 
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
} from "@reach/combobox";

function SearchBar(props){

    // function selectPlace(){

    // }
    return(
        <div className="serch-bar-component">
            {/* <Combobox onSelect={selectPlace}>
                <ComboboxInput>
                
                </ComboboxInput>
                <ComboboxPopover>
                    
                </ComboboxPopover>
            </Combobox> */}
            <Combobox onSelect={props.selectPlace} >
                <ComboboxInput
                    value={props.selectPlace.address}
                    onChange={(e) => props.setValue(e.target.value)}
                    disabled={!props.ready}
                    placeholder="Search a place!"
                />
                <ComboboxPopover>
                    {props.status === "OK" && props.data.map(({ place_id, description, }) => ( 
                        <ComboboxOption key={place_id} value={description}/>
                    ))}
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

export default SearchBar;