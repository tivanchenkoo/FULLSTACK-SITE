export const productsFilter = (products, qstring, filters) => {
	let sortedProducts = []
	switch (filters.sort) {
		case "Цена ↑":
			sortedProducts = [...products].sort((a, b) => b.price - a.price)
			break
		case "Цена ↓":
			sortedProducts = [...products].sort((a, b) => a.price - b.price)
			break
		case "оТновых":
			sortedProducts = [...products].sort((a, b) => a.date - b.date)
			break
		case "оТстарых":
			sortedProducts = [...products].sort((a, b) => b.date - a.date)
			break
		default:
			break
	}

	return sortedProducts

		.filter(
			(good) =>
				good.name.toLowerCase().includes(qstring.toLowerCase()) &&
				good.type === filters.type
		)
		.filter((good) => {
			switch (filters.date) {
				case "Все":
					return true
				case "Недавно":
					return good.date === 2024
				case "Давно":
					return good.date < 2024
				default:
					break
			}
		})
		.filter((good) =>
			filters.country === "Все" ? true : filters.country === good.country
		)
		.filter((good) => {
			if (filters.toPrice && filters.fromPrice) {
				return good.price >= filters.fromPrice && good.price <= filters.toPrice
			} else if (filters.fromPrice) {
				return good.price > filters.fromPrice
			} else if (filters.toPrice) {
				return good.price < filters.toPrice
			} else {
				return true
			}
		})
		.filter((good) => {
			switch (filters.category) {
				case "Одежда":
					return (
						good.category === "Верхняя одежда" ||
						good.category === "Брюки и шорты" ||
						good.category === "Аксессуары" ||
						good.category === "Футболки и блузки" ||
						good.category === "Платья" ||
						good.category === "Юбки и брюки" ||
						good.category === "Одежда"
					)
				case "Спорт и фитнес":
					return (
						good.category === "Тренажеры и оборудование" ||
						good.category === "Спортивная одежда" ||
						good.category === "Аксессуары" ||
						good.category === "Спорт и фитнес"
					)
				case "Дом и быт":
					return (
						good.category === "Мебель" ||
						good.category === "Техника для дома" ||
						good.category === "Декор и товары для дома" ||
						good.category === "Дом и быт"
					)
				case "Красота и здоровье":
					return (
						good.category === "Уход за кожей" ||
						good.category === "Уход за волосами" ||
						good.category === "Здоровье и медицинские товары" ||
						good.category === "Красота и здоровье"
					)
				case "Электроника":
					return (
						good.category === "Смартфоны и гаджеты" ||
						good.category === "Ноутбуки и компьютеры" ||
						good.category === "Фото и видео" ||
						good.category === "Электроника"
					)
				case "Книги и развлечения":
					return (
						good.category === "Книги" ||
						good.category === "Фильмы и музыка" ||
						good.category === "Книги и развлечения"
					)
				case "Мужская одежда":
					return (
						good.category === "Верхняя одежда" ||
						good.category === "Брюки и шорты" ||
						good.category === "Аксессуары" ||
						good.category === "Мужская одежда"
					)
				case "Женская одежда":
					return (
						good.category === "Платья" ||
						good.category === "Футболки и блузки" ||
						good.category === "Юбки и брюки" ||
						good.category === "Аксессуары" ||
						good.category === "Женская одежда"
					)
				default:
					return filters.category ? good.category === filters.category : true
			}
		})
}
