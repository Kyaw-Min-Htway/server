async function logout(request, response){

    try {

        const cookieOptions = {
            httpOnly: true, // Fix `http` to `httpOnly`
            secure: process.env.NODE_ENV === "production", // Use `secure` in production
        };

        return response.cookie('token','',cookieOptions).status(200).json({
            message : "session out",
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = logout