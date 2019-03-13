
export const getStringOfPlaces = (count_adult, count_child, count_baby, selectedPlaces) => {
    
    selectedPlaces = ( selectedPlaces && selectedPlaces.length ) ? selectedPlaces : [];

    let needPlaces 			= count_adult + count_child;
    let selectPlaces 		= selectedPlaces.length;
    let status_string 		= '';


    if ( selectPlaces === 0 )	{
        if ( needPlaces === 1 )
            status_string = 'не выбрано';   // Выберите место
        else
            status_string = 'не выбраны';  // Выберите места
    }
    else
    {
        let diff = needPlaces - selectPlaces;

        if ( diff === 0 )	{
            if ( selectedPlaces.length === 1 ) {
                // status_string = 'Выбранное место: ' + selectedPlaces[0];
                status_string = selectedPlaces[0];
            }
            else
            {
                // status_string = 'Выбранные места: ' + selectedPlaces.join(', ');
                status_string = selectedPlaces.join(', ');
            }
        } else if ( diff === 1 )	{
            status_string = 'осталось выбрать 1 место';
        }
        else
        {
            status_string = 'осталось выбрать ' + diff + ' места';
        }
    }

    return status_string;    
}





export const getStringOfPlaces2 = (count_adult, count_child, count_baby, selectedPlaces) => {
    
    selectedPlaces = ( selectedPlaces && selectedPlaces.length ) ? selectedPlaces : [];

    let needPlaces 			= count_adult + count_child;
    let selectPlaces 		= selectedPlaces.length;
    let status_string 		= '';


    if ( selectPlaces === 0 )	{
        if ( needPlaces === 1 )
            status_string = 'Выберите место'; 
        else
            status_string = 'Выберите места';
    }
    else
    {
        let diff = needPlaces - selectPlaces;

        if ( diff === 0 )	{
            if ( selectedPlaces.length === 1 ) {
                status_string = 'Выбранное место: ' + selectedPlaces[0];
            }
            else
            {
                status_string = 'Выбранные места: ' + selectedPlaces.join(', ');
            }
        } else if ( diff === 1 )	{
            status_string = 'Осталось выбрать 1 место';
        }
        else
        {
            status_string = 'Осталось выбрать ' + diff + ' места';
        }
    }

    return status_string;    
}