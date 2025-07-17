const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

const expenseList = document.querySelector("ul")

amount.oninput = function(){
    let value = amount.value.replace(/\D/g, "")
    value = Number(value) / 100
    amount.dataset.rawValue = value
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    return value
}

const expenseQuant = []
let expenseQuantAmount = 0

form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        raw_amount: amount.dataset.rawValue,
        create_at: new Date(),
    }

    const expenseCount = document.querySelector("header h2")
    expenseQuantAmount += Number(newExpense.raw_amount)
    expenseCount.textContent = formatCurrencyBRL(expenseQuantAmount)

    const expenseAmount = document.querySelector("header p span")
    expenseQuant.push(newExpense)
    expenseAmount.textContent = `${expenseQuant.length} ${expenseQuant.length > 1 ? "despesas" : "despesa"}`

    amount.value = ""
    expense.value = ""
    category.value = ""
    expense.focus()
    
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", `${newExpense.category_name}`)

        const expenseDiv = document.createElement("div")
        expenseDiv.classList.add("expense-info")

        const expenseItemName = document.createElement("Strong")
        expenseItemName.textContent = newExpense.expense

        const expenseItemId = document.createElement("span")
        expenseItemId.textContent = newExpense.category_name

        const expenseItemAmount = document.createElement("span")
        expenseItemAmount.classList.add("expense-amount")
        expenseItemAmount.textContent = newExpense.amount

        const expenseRemove = document.createElement("img")
        expenseRemove.setAttribute("src", "img/remove.svg")
        expenseRemove.setAttribute("alt", "remover")
        expenseRemove.classList.add("remove-icon")
        expenseRemove.addEventListener("click", () => {
            expenseItem.remove()

            const expenseCount = document.querySelector("header h2")
            expenseQuantAmount -= Number(newExpense.raw_amount)
            expenseCount.textContent = formatCurrencyBRL(expenseQuantAmount)

            const expenseAmount = document.querySelector("header p span")
            expenseQuant.pop(newExpense)
            expenseAmount.textContent = `${expenseQuant.length} ${expenseQuant.length > 1 ? "despesas" : "despesa"}`
        })

        expenseItem.append(expenseIcon, expenseDiv, expenseItemAmount, expenseRemove)
        expenseList.append(expenseItem)
        expenseDiv.append(expenseItemName, expenseItemId)
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas")
        console.log(error)
    }
}