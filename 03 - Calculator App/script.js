class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement //
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        const deletable = this.currentOperand.toString()
        const deletableArray = deletable.split('')
        deletableArray.pop()
        this.currentOperand = deletableArray
        deletableArray.join("")
        this.currentOperand = deletableArray.join("")
        console.log(this.currentOperand)
        console.log(deletableArray)
        
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){   
        if (this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand + ` ${this.operation}`
        this.currentOperand = ''

    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev)  || isNaN(current))  return
        if (!isNaN(prev)  && this.operation === '÷' && current === 0){
            this.currentOperand = "Error!"
            return
        }
            
        switch (this.operation){
            case '+' :
                computation = prev + current
                break
            case '+' :
                computation = prev + current
                break
            case '-' :
                computation = prev - current
                break
            case '*' :
                computation = prev * current
                break
            case '÷' :
                computation = prev / current
                break
            default:
                return 
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand

        // if(this.operation !== ''){
        //     this.previousOperandTextElement.innerText = this.previousOperand + this.operation
        // }
        // else{
        //     this.previousOperandTextElement.innerText = this.previousOperand + this.operation   
        // }
        // this.operationTextElement = this.operation
        // console.log(this.operationTextElement)
        console.log(this.currentOperandTextElement)
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
        
    }
)

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
    
    

})
// deleteButton.addEventListener('click', button =>)
/* 
    compute(){
        let result = ''
        this.currentOperand = this.currentOperand.ParseFloat()
        this.previousOperand = this.previousOperand.ParseFloat()
        if (this.operation === '+'){
            return result = previousOperand + currentOperand
        }
        if (this.operation === '-'){
            return result = previousOperand - currentOperand
        }
        if (this.operation === '*'){
            return result = previousOperand * currentOperand
        }
        if (this.operation === '÷'){
            return result = previousOperand / currentOperand
        }
    this.currentOperand = result.toString()
    this.previousOperand = ''
    this.operation = ''

    updateDisplay()
}

*/