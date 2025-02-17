import { CgChevronDown } from "react-icons/cg"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import TextInput from "../../../shared/ui/textInput/UI/TextInput.jsx"
import { Col, Container, Row } from "react-bootstrap"
import styles from "../globalProfile.module.scss"
import { substring } from "@shared/utils/jsFunctions/substring"
import "../ProfileThemes.scss"
import SelectCountry from "../../selectCountry/UI/SelectCountry.jsx"
import { countries } from "@entities/selectCountries/countries.js"
import { exitFromUser, sendUpdate } from "@features/slices/currentUserSlice.js"
import { chooseTheme } from "@features/slices/mainPageSlice.js"
import { addCurrentUser } from "@features/slices/currentUserSlice.js"
import { useNavigate } from "react-router"
import { selectCurrentUser } from "../../../features/slices/currentUserSlice.js"
const YourProfile = ({ currentUser }) => {
	const theme = useSelector(chooseTheme) === "white" ? "light" : "dark"
	const [show, setShow] = useState(false)
	const toggleShow = () => {
		setShow(!show)
	}
	const user = useSelector(selectCurrentUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const checkIsNo = (val) => (val === "no" || val === null ? "Не указан" : val)
	return (
		<>
			<ToastContainer theme={theme} />
			<article className={substring(styles.yourProfile, "yourProfile")}>
				<Container>
					<Row className="justify-content-center">
						<Col
							xs={12}
							lg={6}
							className={substring(styles.yourProfile__globalinfo, [
								"yourProfile__globalinfo",
							])}
						>
							<div className={styles.yourProfile__imageWithName}>
								{currentUser?.image === "no" || !currentUser?.image ? (
									<>
										<label
											className={substring(
												styles.yourProfile__defaultPhoto,
												"yourProfile__defaultPhoto"
											)}
										>
											<label
												className={substring(
													"yourProfile__changePhoto",
													styles.yourProfile__changePhoto
												)}
											>
												<input
													type="file"
													className="d-none"
													onChange={(e) => {
														const typeOfFile = /image.*/i
														const file = e.target.files[0]
														if (file.type.match(typeOfFile)) {
															const reader = new FileReader()
															reader.onload = () => {
																dispatch(
																	addCurrentUser({
																		image: reader.result,
																	})
																)
															}
															reader.readAsDataURL(file)
														}
													}}
												></input>
											</label>
										</label>
										<TextInput
											customInput={
												<input
													type="text"
													value={currentUser.name}
													onChange={(e) => {
														dispatch(
															addCurrentUser({
																name: e.target.value,
															})
														)
													}}
													className="yourProfile__input"
												/>
											}
											text={currentUser.name}
										>
											{currentUser.name}
										</TextInput>
									</>
								) : (
									<div>
										<img
											className={styles.yourProfile__photo}
											src={currentUser.image}
										></img>
										<label
											style={{ cursor: "pointer" }}
											className={substring(
												"yourProfile__changePhoto",
												styles.yourProfile__changePhoto
											)}
										>
											<input
												type="file"
												className="d-none"
												onChange={(e) => {
													const typeOfFile = /image.*/i
													const file = e.target.files[0]
													if (file.type.match(typeOfFile)) {
														const reader = new FileReader()
														reader.onload = () => {
															dispatch(
																addCurrentUser({
																	image: reader.result,
																})
															)
														}
														reader.readAsDataURL(file)
													}
												}}
											></input>
										</label>
										<TextInput
											className="mt-5"
											customInput={
												<input
													type="text"
													value={currentUser.name}
													onChange={(e) => {
														dispatch(
															addCurrentUser({
																name: e.target.value,
															})
														)
													}}
													className="yourProfile__input"
												/>
											}
											text={currentUser.name}
										>
											{currentUser.name}
										</TextInput>
									</div>
								)}
							</div>
							<div className="yourProfile__yearsSoldProducts">
								<p className={styles.yourProfile__years}>
									Лет на нашем сайте {currentUser.regist_data - 2023}
								</p>
								<p className={styles.yourProfile__soldProducts}>
									Продано товаров :
									<span className={styles.yourProfile__title}>
										{currentUser.sold}
									</span>
								</p>
								<button
									type="button"
									className={styles.yourProfile__exit}
									onClick={async () => {
										dispatch(exitFromUser())
										localStorage.clear()
										navigate("/registration")
									}}
								>
									Выйти
								</button>
							</div>
						</Col>
						<Col xs={12} lg={6}>
							<form
								className={substring(
									styles.yourProfile__additionalinfo,
									"yourProfile__additionalinfo"
								)}
								onSubmit={(e) => {
									e.preventDefault()
									if (
										user.password.length < 7 ||
										user.password.length >= 50 ||
										user.mail.length < 7 ||
										user.mail.length >= 50
									) {
										toast.error(
											"Пароль и почта должен быть больше 7 символов, но не меньше 50"
										)
									} else if (
										!user.password.match(/[a-z]/) ||
										!user.password.match(/[A-Z]/) ||
										!user.password.match(/\d/)
									) {
										toast.error(
											"Пароль должен соддержать заглавные и обычные буквы , цифры "
										)
									} else if (!user.mail.match(/@/) || !user.mail.match(/./)) {
										toast.error("Проверьте валидность почты")
									} else {
										dispatch(sendUpdate(currentUser))
									}
								}}
							>
								<TextInput
									customInput={
										<input
											type="email"
											value={currentUser.mail}
											onChange={(e) => {
												dispatch(addCurrentUser({ mail: e.target.value }))
											}}
											className="yourProfile__input"
										/>
									}
									text={currentUser.mail}
									label="Почта :"
								></TextInput>
								<TextInput
									logo={
										<button
											onClick={toggleShow}
											type="button"
											className={substring(
												styles.otherProfile__discribePhoto,
												"otherProfile__eye"
											)}
										></button>
									}
									customInput={
										<input
											type={show ? "text" : "password"}
											value={currentUser.password}
											onChange={(e) => {
												dispatch(
													addCurrentUser({
														password: e.target.value,
													})
												)
											}}
											className="yourProfile__input"
										/>
									}
									text={currentUser.password}
									label="Пароль :"
								></TextInput>
								<TextInput
									customInput={
										<input
											type="phone"
											value={checkIsNo(currentUser.phone)}
											onChange={(e) => {
												dispatch(
													addCurrentUser({
														phone: e.target.value,
													})
												)
											}}
											className="yourProfile__input"
										/>
									}
									text={checkIsNo(currentUser.phone)}
									label="Номер телефона :"
								></TextInput>
								<TextInput
									customInput={
										<SelectCountry
											defaultValue={checkIsNo(currentUser.region)}
											onChange={(e) =>
												dispatch(
													addCurrentUser({
														region: e.target.value,
													})
												)
											}
											countries={countries}
										></SelectCountry>
									}
									text={checkIsNo(currentUser.region)}
									label="Регион :"
								></TextInput>

								<div
									className={substring(
										"yourProfile__line",
										styles.yourProfile__line
									)}
								></div>
								<label className={"yourProfile__label"}>
									Получать уведовмления и новости
									<input
										readOnly
										type="checkbox"
										className={styles.yourProfile__checkbox}
										onClick={(e) => {
											dispatch(
												addCurrentUser({
													allowNotifications: !currentUser.allowNotifications,
												})
											)
										}}
										checked={currentUser.allowNotifications}
									/>
									<div
										className={substring(
											"yourProfile__customCheckbox",
											styles.yourProfile__customCheckbox
										)}
									>
										<CgChevronDown className={styles.yourProfile__checkMark} />
									</div>
								</label>
								<div
									className={substring(
										"yourProfile__line",
										styles.yourProfile__line
									)}
								></div>
								<TextInput
									logo={
										<div
											className={substring(
												styles.otherProfile__discribePhoto,
												"otherProfile__instagram"
											)}
										></div>
									}
									customInput={
										<>
											<input
												type="text"
												value={checkIsNo(currentUser.instagram)}
												onChange={(e) => {
													dispatch(
														addCurrentUser({
															instagram: e.target.value,
														})
													)
												}}
												className="yourProfile__input"
											/>
										</>
									}
									text={checkIsNo(currentUser.instagram)}
									label="Инстаграм :"
								></TextInput>
								<TextInput
									logo={
										<div
											className={substring(
												styles.otherProfile__discribePhoto,
												"otherProfile__telegram"
											)}
										></div>
									}
									customInput={
										<input
											type="text"
											value={checkIsNo(currentUser.telegram)}
											onChange={(e) => {
												dispatch(
													addCurrentUser({
														telegram: e.target.value,
													})
												)
											}}
											className="yourProfile__input"
										/>
									}
									text={checkIsNo(currentUser.telegram)}
									label="Телеграм :"
								></TextInput>
								<button type="submit" className={styles.yourProfile__yelbut}>
									Сохранить изменения
								</button>
							</form>
						</Col>
					</Row>
				</Container>
			</article>
		</>
	)
}

export default YourProfile
