import { SLIDERS_UPDATE } from './../constants/Slider';

export function setSliders(sliders) {
	return (dispatch, getState) => {


		dispatch({
			type: SLIDERS_UPDATE,
			payload: sliders
		});


	};
}
