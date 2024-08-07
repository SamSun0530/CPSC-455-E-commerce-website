const ADDRESS_VALIDATION_API_URL = "https://addressvalidation.googleapis.com/v1:validateAddress?key=";

const verifyAddress = async (reqBody) => {
    try {
        const response = await fetch(ADDRESS_VALIDATION_API_URL + process.env.ADDRESS_VALIDATION_API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        const result = await response.json();
        return {missing: result.result.address.missingComponentTypes, unconfirmed: result.result.address.unconfirmedComponentTypes};
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    verifyAddress
}