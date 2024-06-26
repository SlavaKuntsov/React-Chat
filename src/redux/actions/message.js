import messageApi from '../../utils/api/message'

const actions = {
	setMessages: items => ({
		type: 'MESSAGES:SET_ITEMS', 
		payload: items
	}),
	setIsLoading: bool => ({
		type: 'MESSAGES:SET_IS_LOADING', 
		payload: bool
	}),
	fetchMessages: (dialogId) => dispatch => {
		dispatch(actions.setIsLoading(true))
		messageApi
			.getAllDialogId(dialogId)
			.then(({data}) => {
				dispatch(actions.setMessages(data))
			})
			.catch(() => {
				dispatch(actions.setIsLoading(false))
			})
	}
}

export default actions