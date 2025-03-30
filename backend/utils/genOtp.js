const genOtp = ()=>{
    try {
        const num1 = Math.floor(Math.random()*10).toString()
        const num2 = Math.floor(Math.random()*10)
        const num3 = Math.floor(Math.random()*10)
        const num4 = Math.floor(Math.random()*10)
        const num5 = Math.floor(Math.random()*10)
        const num = num1+num2+num3+num4+num5;
        return num.toString()
    } catch (error) {
        return ""
    }
}

export default genOtp