<<<<<<< HEAD
import cogoToast from "cogo-toast";
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {

    IsEmpty(value) {
        return value.length === 0;
    }

    IsMobile(value){
        return MobileRegx.test(value);
    }

    IsEmail(value) {
        return !EmailRegx.test(value);
    }

=======
import cogoToast from "@dsdeepak17/cogo-toast";
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
class FormHelper {
    IsEmpty(value) {
        return value.length === 0;
    }
    IsMobile(value){
        return MobileRegx.test(value);
    }
    IsEmail(value) {
        return !EmailRegx.test(value);
    }
>>>>>>> f1f891f6cca537cedf5f794ccf54195a063e0299
    ErrorToast(msg) {
        cogoToast.error(msg, { position: "bottom-center" });
    }
    SuccessToast(msg) {
        cogoToast.success(msg, { position: "bottom-center" });
    }
<<<<<<< HEAD


=======
>>>>>>> f1f891f6cca537cedf5f794ccf54195a063e0299
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
<<<<<<< HEAD


}

export const {
    IsEmpty,
    IsMobile,
    IsEmail,
    ErrorToast,
    getBase64,
    SuccessToast
} = new FormHelper();
=======
}
export const {IsEmpty, IsMobile, IsEmail, ErrorToast, getBase64, SuccessToast} = new FormHelper();
>>>>>>> f1f891f6cca537cedf5f794ccf54195a063e0299
