async function searchUser(request, response)  {
    try {
        const ( search ) = request.body;
        const query = new RegExp(search, 'i','g');
        const user = await 
    } catch (error) {
        return response.status({
            message : error.message
            error: true
        })
    }
}