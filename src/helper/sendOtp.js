const sendOtp = async (email)=>{
    const data = await fetch("http://localhost:4000/api/v1/otp/send",{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            email:email
        })
    });
    await data.json();
}

export default sendOtp;