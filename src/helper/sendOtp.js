const sendOtp = async (email)=>{
    const data = await fetch("https://farmerspalm.onrender.com/api/v1/otp/send",{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            email:email
        })
    });
    await data.json();
}

export default sendOtp;
