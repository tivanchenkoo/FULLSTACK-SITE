import React from "react"
import { Item } from "react-photoswipe-gallery"
import { substring } from "../../shared/utils/substring"
import "./AdditionalImageThemes.scss"
import styles from "./AdditionalImage.module.scss"
const AdditionalImage = ({ createdProduct, setCreatedProduct, index }) => {
	return (
		<label className="createProduct__additionalImage">
			{createdProduct?.additionalImages &&
			createdProduct?.additionalImages[index] ? (
				<Item
					width="1024"
					height="768"
					original={createdProduct.additionalImages[index]}
					thumbnail={createdProduct.additionalImages[index]}
				>
					{({ ref, open }) => (
						<img
							ref={ref}
							onClick={open}
							src={createdProduct.additionalImages[index]}
							alt=""
							className={substring(
								"createProduct__additionalImagePreview",
								styles.createProduct__additionalImagePreview
							)}
						/>
					)}
				</Item>
			) : (
				<>
					<div
						className={substring(
							styles.createProduct__defaultAdditionalPhoto,
							"createProducts__additionalImagePreview",
							"createProduct__defaultAdditionalPhoto"
						)}
					>
						Нету
					</div>
					<input
						onChange={(e) => {
							const file = e.target.files[0]
							const type = /image.*/
							if (file.type.match(type)) {
								const reader = new FileReader()
								reader.onload = () => {
									setCreatedProduct({
										...createdProduct,
										additionalImages: [
											...createdProduct.additionalImages,
											reader.result,
										],
									})
								}
								reader.readAsDataURL(file)
							}
						}}
						type="file"
						className="d-none"
					/>
				</>
			)}
		</label>
	)
}

export default AdditionalImage