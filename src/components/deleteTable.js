import axios from 'axios'
import SweetAlert from 'sweetalert2'



export const dropTable = async (Sheet) => {

    const secondStep = async (Sheet) => {
        let confirmText = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;;
        const { value: numberValue } = await SweetAlert.fire({
            title: "Enter code",
            text: confirmText,
            input: 'text'
        })
        if (numberValue === confirmText.toString()) {
            axios({
                method: 'POST',
                url: "https://serverabb.herokuapp.com/deleteTable",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                data: {
                    sheet: Sheet
                }
            }).catch((err) => {
                return SweetAlert.fire({
                    title: "Ooops",
                    text: "unexpected error occurred while deleting your table \n please check your network connection ",
                    icon: 'error',
                })
            }).then((res) => {
                if (res)
                    if (res.data)
                        if (res.data.success) {
                            SweetAlert.fire({
                                icon: 'success',
                                title: "Table successfullly deleted"
                            })
                        } else {
                            SweetAlert.fire({
                                icon: 'error',
                                title: "Table could not be  deleted"
                            })
                        }
                    else {
                        SweetAlert.fire({
                            icon: 'error',
                            title: "Table could not be  deleted"
                        })
                    }
                else {
                    SweetAlert.fire({
                        icon: 'error',
                        title: "Table could not be  deleted"
                    })
                }
            })


        } else {
            SweetAlert.fire({
                icon: 'error',
                title: "Wrong secure code"
            })
        }
    }


    SweetAlert.fire({
        title: "Delete TABLE",
        text: "Are you sure you want to delete WHOLE table ?",
        showCancelButton: true,
        cancelButtonColor: "green",
        cancelButtonText: "NO",
        confirmButtonColor: "red",
        confirmButtonText: "YES",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            secondStep(Sheet)
        }
    })

}