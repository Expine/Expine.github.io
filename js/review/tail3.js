const bad = "気になった点";
{
	const main = document.getElementById("気になった点");
	if (main != null) {
		const list = main.nextElementSibling;
		if (list != null && list.tagName.toLowerCase() == "ul") {
			const insert = document.createElement("div");
			main.className = "bad";
			insert.className = "bad";
			main.parentNode.insertBefore(insert, list);
			list.parentNode.removeChild(list);
			insert.appendChild(list);
		}
	}
}

function toggle_bad() {
	Array.prototype.slice.call(document.querySelectorAll(".bad")).forEach(it => it.style.display == "none" ? it.style.display = "block" : it.style.display = "none")
	Array.prototype.slice.call(document.querySelectorAll(".bad_button")).forEach(it => {
		let isBad = document.querySelector('.bad') && document.querySelector('.bad').style.display == 'block';
		it.value = isBad ? "ネガティブな点を見る状態です" : "ネガティブな点を見ない状態です";
		if(isBad) 	{ it.classList.add(`btn-primary`); it.classList.remove(`btn-default`); }
		else		{ it.classList.remove(`btn-primary`); it.classList.add(`btn-default`); }
	});
}

function toggle_impression(id) {
	Array.prototype.slice.call(document.querySelectorAll(`.impression-${id}`)).forEach(it => it.style.display == "none" ? it.style.display = "block" : it.style.display = "none")
	const button = document.querySelector(`.impression_button-${id}`);
	const isShow = document.querySelector(`.impression-${id}`).style.display == 'block';
	button.value = isShow ? "感想を非表示にする" : "感想を表示する";
	if(isShow)  { button.classList.add(`btn-default`); button.classList.remove(`btn-primary`); }
	else		{ button.classList.remove(`btn-default`); button.classList.add(`btn-primary`); }
}

Array.prototype.slice.call(document.querySelectorAll(".bad_button")).forEach(it => {
	it.onclick = toggle_bad;
	it.classList.add(`btn`);
	it.style = `font-size:15px;`;
});

const impression = "感想";
for (let idx = 0; idx < 10; ++idx) {
	const main = document.getElementById(idx == 0 ? `${impression}` : `${impression}-${idx}`);
	if (main == null) {
		continue;
	}
	let target = main.nextElementSibling;
	if (target != null && target.tagName.toLowerCase() == "ul") {
		target = target.nextElementSibling;
	}
	if (target != null && target.tagName.toLowerCase() == "p") {
		const button = document.createElement("input");
		button.type = "button";
		button.className = `impression_button-${idx}`;
		main.parentElement.insertBefore(button, target);

		const insert = document.createElement("div");
		main.parentNode.insertBefore(insert, target);

		if (idx != 0) {
			main.className = (`impression-${idx}`);
			main.parentNode.removeChild(main);
			insert.appendChild(main);	
		}

		while (target != null) {
			if (target.tagName.toLowerCase() == "h1" || target.tagName.toLowerCase() == "h2") {
				break;
			}
			const nextTarget = target.nextElementSibling;
			if (target.autoExclude) {
			} else {
				target.className = (`impression-${idx}`);
			}
			target.parentNode.removeChild(target);
			insert.appendChild(target);
			target = nextTarget;
		}

		button.onclick = function() { toggle_impression(idx); };

		toggle_impression(idx);
	}
}

toggle_bad();