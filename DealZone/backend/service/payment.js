const validCard = {
    number: "1111-2222-3333-4444",
    cvc: '123',
    month: '12',
    year: '12',
    card_postal_code: '12345'
}

const isPurchaseMethodValid = ({card_number, cvc, month, year, card_postal_code}) => {
    if (validCard.number == card_number
        && validCard.cvc == cvc
        && validCard.month == month
        && validCard.year == year
        && validCard.card_postal_code == card_postal_code
    ) {
        return true;
    } else {
        return false;
    }
}



module.exports = {
    isPurchaseMethodValid
};