export declare class UpdateProfileDto {
    name?: string;
    phone?: string;
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
export declare class CreateAddressDto {
    label?: string;
    receiverName: string;
    phone: string;
    address: string;
    notes?: string;
    cityId: string;
    provinceId: string;
    postalCode: string;
}
export declare class UpdateAddressDto {
    label?: string;
    receiverName?: string;
    phone?: string;
    address?: string;
    notes?: string;
    cityId?: string;
    provinceId?: string;
    postalCode?: string;
}
