import styles from "../Form.module.scss"
import { useState } from "react"
import { toast } from "react-toastify"
import { sendRegistration } from "@features/slices/currentUserSlice"
import "../FormThemes.scss"
import { substring } from "@shared/utils/jsFunctions/substring"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from "react-redux"
const RegistrationForm = ({ setTypeOfSending, theme }) => {
	const dispatch = useDispatch()
	const initalState = {
		mail: "",
		password: "",
		submitPassword: "",
	}
	const [registrationVals, setRegistrationVals] = useState(initalState)
	const { mail, password, submitPassword } = registrationVals
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				if (!password || !mail || !submitPassword) {
					toast.info("Заполните все поля перед отправкой 🙂", {
						theme,
					})
				} else if (password !== submitPassword) {
					toast.error("Пароли не совпадают 😒 ", { theme })
				} else if (
					password.length < 7 ||
					password.length >= 50 ||
					mail.length < 7 ||
					mail.length >= 50
				) {
					toast.info(
						"Пароль и почта должен быть больше 7 символов, но не меньше 50"
					)
				} else if (
					!password.match(/[a-z]/) ||
					!password.match(/[A-Z]/) ||
					!password.match(/\d/)
				) {
					toast.info(
						"Пароль должен соддержать заглавные и обычные буквы , цифры "
					)
				} else if (!mail.match(/@/) || !mail.match(/./)) {
					toast.info("Проверьте валидность почты")
				} else {
					dispatch(sendRegistration(registrationVals))
				}
			}}
			className={substring(styles.registration__form, "registration__form")}
		>
			<label className={styles.registration__label}>
				<p>Почта</p>
				<input
					type="mail"
					className={substring(
						"registration__input",
						styles.registration__input
					)}
					placeholder="Например, example@gmail.com"
					value={registrationVals.mail}
					onChange={(e) =>
						setRegistrationVals({
							...registrationVals,
							mail: e.target.value,
						})
					}
				/>
			</label>
			<label className={styles.registration__label}>
				<p>Пароль</p>
				<input
					type="password"
					value={registrationVals.password}
					className={substring(
						"registration__input",
						styles.registration__input
					)}
					placeholder="Например, 12345678"
					onChange={(e) =>
						setRegistrationVals({
							...registrationVals,
							password: e.target.value,
						})
					}
				/>
			</label>
			<label className={styles.registration__label}>
				<p>Потвердите пароль</p>
				<input
					type="password"
					className={substring(
						"registration__input",
						styles.registration__input
					)}
					value={registrationVals.submitPassword}
					onChange={(e) =>
						setRegistrationVals({
							...registrationVals,
							submitPassword: e.target.value,
						})
					}
				/>
			</label>
			<button type="submit" className={styles.registration__registrate}>
				Зарегестрироваться
			</button>
			<p>Уже есть аккаунт?</p>
			<button
				type="button"
				onClick={() => {
					setTypeOfSending("enter")
				}}
				className={styles.registration__enter}
			>
				Войти
			</button>
		</form>
	)
}

export default RegistrationForm
