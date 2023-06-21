import userApi from '../../utils/api/user'
import createNotification from '../../utils/helpers/createNotification'

const actions = {
	setUser: data => ({
		type: 'USER:SET_DATA',
		payload: data
	}),
	setVerify: data => ({
		type: 'USER:SET_VERIFY',
		payload: data
	}),
	fetchUserData: () => dispatch => {
		console.log('user data')
		userApi
			.getMe()
			.then(({ data }) => {
				dispatch(actions.setUser(data))
			})
			.catch(err => {
				console.log(err)
			})
	},
	fetchUserLogin: (postData, props) => dispatch => {
		console.log('postData login: ', postData);
		userApi.login(postData).then(({ data }) => {
			console.log('data: ', data);
			const { status, token } = data
			if (status === 'success') {
				createNotification({
					type: 'success',
					title: 'Отлично!',
					text: 'Авторизация прошла успешно'
				})
				// props.history.push('/home')

				window.axios.defaults.headers.common['token'] = token
				window.localStorage['token'] = token

				dispatch(actions.fetchUserData())

				// Navigate('/home')
			}
			if (status === 'failed') {
				createNotification({
					type: 'error',
					title: 'Ошибка при авторизации!',
					text: 'Неверный логин или пароль'
				})
			}
			if (status === 'error') {
				createNotification({
					type: 'error',
					title: 'Ошибка!',
					text: 'Пользователь не найден'
				})
			}
		})
	},
	fetchVerify: postData => dispatch => {
		userApi.verify(postData).then(code => {
			console.log("code", code.data)
			dispatch(actions.setVerify({verifyCode: code.data}))
		})
	},
	fetchUserRegister: (postData, props) => dispatch => {
		console.log('postData reg: ', postData);

		
		userApi.registration(postData).then(({ data }) => {
			
			
			console.log('data: ', data);
			const { status, token } = data

			if (status === 'success') {
				createNotification({
					type: 'success',
					title: 'Отлично!',
					text: 'Регистрация прошла успешно'
				})
				// props.history.push('/home')
				
				dispatch(actions.fetchVerify(postData)) // verify user

				window.axios.defaults.headers.common['token'] = token
				window.localStorage['token'] = token
				
				console.log('postData: ', postData);


				// console.log('dispatch(actions.fetchVerify(postData)): ', dispatch(actions.fetchVerify(postData)));


				// ========================================

				
				// setTimeout(() => {
				// 	dispatch(actions.fetchUserLogin(postData))
				// }, 1000)


			// 	dispatch(actions.fetchUserData())

			// 	Navigate('/home')
			}

			if (status === 'failed') {
				createNotification({
					type: 'error',
					title: 'Ошибка при авторизации!',
					text: 'Неверный логин или пароль'
				})
			}

			if (status === 'error') {
				createNotification({
					type: 'error',
					title: 'Ошибка!',
					text: 'Пользователь не найден'
				})
			}
		})
		.catch(err => {
			console.log(err)
		})
	}
}

export default actions
