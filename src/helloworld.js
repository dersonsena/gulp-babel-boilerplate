const asyncFunction = async () => {
	return 'Hello World'
}

(async function () {
	const text = await asyncFunction()
	const rootDiv = document.getElementById('root')
	rootDiv.innerHTML = text
})()
