const initialState = {
    products: [],
    userInfo: {
        shippingInfo: {
            recipientName: '',
            recipientPhone: '',
            streetAdress: '',
            building: '',
            city: '',
            country: '',
            ZIP: '' 
        },
        billingInfo: {
            fullName: '',
            email: '',
            streetAdress: '',
            building: '',
            city: '',
            country: '',
            ZIP: '' 
        },
        currentStep: 'shipping'
    },
    chosenItems: [],
    availableCountries: [],
    productReviews: {}
}

export default initialState;