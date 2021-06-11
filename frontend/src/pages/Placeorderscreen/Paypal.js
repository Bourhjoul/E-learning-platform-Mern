import React, { useRef, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
const Paypal = () => {

    const cartReducer = useSelector(state => state.cartReducer)
const {cartItems} = cartReducer


    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: 'USD',
                                value: cartItems.reduce((acc,item )=> acc + item.price,0).toFixed(2)

                            }
                        }
                    ]
                })
            },
            onApprove: async(data, actions) => {
                const order = await actions.order.capture()
                console.log(order)
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}>

            </div>
        </div>
    )
}

export default Paypal
