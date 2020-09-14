const filterByType = (type, ...values) => values.filter(value => typeof value === type), // собираем значения в массив и фильтруем их по типу

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //массив дивов
		responseBlocksArray.forEach(block => block.style.display = 'none'); // всем этим дивам ставим display: none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // фунция показа результата
		hideAllResponseBlocks();  // скрываем дивы
		document.querySelector(blockSelector).style.display = 'block'; // тому диву, у которого класс blockSelector - показываем его
		if (spanSelector) { // а если есть spanSelector,
			document.querySelector(spanSelector).textContent = msgText; //то в него записываем сообщение
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // принимает сообщение об ошибки, и показывает ошибку

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // принимает сообщение об ошибки, и показывает результат

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // разблокирует див 'нет результатвов'

	tryFilterByType = (type, values) => {  // принимает тип и значения введенные
		try { //перехват
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // собираем в строку ерез запятую
			const alertMsg = (valuesArray.length) ?  // если массив не пуст, то
				`Данные с типом ${type}: ${valuesArray}` : // выводим это сообщениес выбранным типом и значениями (этого типа)
				`Отсутствуют данные типа ${type}`; // иначе данные отсутствуют
			showResults(alertMsg); // вызов функции с резултатом
		} catch (e) {
			showError(`Ошибка: ${e}`);  // перехват ошибки. Вызов функции ошибки
		}
	};


const filterButton = document.querySelector('#filter-btn');  // кнопка

filterButton.addEventListener('click', e => {  // обработчик по нажатию на кнопку
	const typeInput = document.querySelector('#type');  // получаем значение в первом инпуте (получаем тип)
	const dataInput = document.querySelector('#data');  //  получаем все значения что ввели

	if (dataInput.value === '') {  // если ничего не ввели
		dataInput.setCustomValidity('Поле не должно быть пустым!');  //  то появляется сообщение что поле не должно быть пустым
		showNoResults();  // вызов функции нет результатов)
	} else {    // иначе
		dataInput.setCustomValidity('');  // очищаем кастомную валидацию (не знаю как по другому сказать)
		e.preventDefault();  // отключаем стандартное поведение кнопки
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());  // вызываем функцию фильтрации
	}
});

