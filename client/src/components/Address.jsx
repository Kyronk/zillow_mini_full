import React, { memo, useEffect, useState } from 'react'
import { Select, InputReadOnly } from "../components/";
import { apiGetPublicDistrict, apiGetPublicProvince, apiGetPublicWard } from '../services';
import { useSelector } from 'react-redux';

const Address = ({ payload, setPayload, invalidFields, setInvalidFields }) => {

    const { dataEdit } = useSelector(state => state.post);
    // console.log(dataEdit)

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [province, setProvince] = useState("");
    // console.log(province)
    const [district, setDistrict] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [ ward, setWard ] = useState("");
    const [ reset, setReset ] = useState(false);

    // get data có sẵn để update
    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(",");
            let foundProvince = provinces?.length > 0 && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1 ]?.trim());
            setProvince(foundProvince ? foundProvince.province_id : "");
        }
    }, [provinces, dataEdit]);

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(",");
            let foundDistrict = districts?.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2 ]?.trim());
            setDistrictId(foundDistrict ? foundDistrict.district_id : "");
        }
    }, [districts, dataEdit]);

    // useEffect(() => {
    //     let addressArr = dataEdit?.address?.split(",");
    //     let foundDistrict = districts.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2 ]?.trim());
    //     setDistrictId(foundDistrict ? foundDistrict.district_id : "");
    // }, [ward]);



    // set data dể create
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvince();
            // console.log(response);
            if (response.status === 200) {
                setProvinces(response?.data?.results)
            }
        };
        fetchPublicProvince();
    }, []);

    useEffect(() => {
        setDistrict("");
        setWard("");
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            // console.log(response);
            if (response.status === 200) {
                setDistricts(response?.data?.results);
            }
        }
        province && fetchPublicDistrict(province);
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);
        
    useEffect(() => {
        setWard("");
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(districtId);
            // console.log(response);
            if (response.status === 200) {
                setWards(response?.data?.results)
            }
        }
        districtId && fetchPublicWard(districtId);
        !province ? setReset(true) : setReset(false);
        
    }, [province, districtId]);
    
    
    // add dữ liệu cho payload để create và update
    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name}, ` : ""}${districtId ? `${districts?.find(item => item.district_id === districtId)?.district_name}, ` : ""}${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ""}`,
            province: province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ""
        }))
    }, [province, districtId]);


    // console.log({ province, districtId })
    return (
        <div >
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê: </h2>

            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select 
                        invalidFields={invalidFields} 
                        setInvalidFields={setInvalidFields} 
                        type="province" 
                        value={province} 
                        setValue={setProvince} 
                        options={provinces} 
                        label="Tỉnh / Thành phố" />
                    <Select 
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields} 
                        type="district" 
                        reset={reset} 
                        value={districtId} 
                        setValue={setDistrictId} 
                        options={districts} 
                        label="Quận / Huyện" />
                    <Select 
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields} 
                        type="ward" 
                        reset={reset} 
                        value={ward} 
                        setValue={setWard} 
                        options={wards} 
                        label="Phường / Xã" />


                </div>

                {/* dia chi chinh xac */}
                {/* <div className='flex flex-col gap-2'>
                    <label className='font-medium' htmlFor="exactly-address">Địa chỉ chính xác</label>
                    <input 
                        type="text" 
                        readOnly 
                        className='outline-none border border-gray-200 rounded-md bg-gray-100 p-2 w-full'
                        id="exactly-address"
                        value={`${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ""} ${districtId ? `${districts?.find(item => item.district_id === districtId)?.district_name},` : ""} ${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ""} `}
                        />
                </div> */}
                <InputReadOnly label={"Địa chỉ chính xác"} value={`${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ""} ${districtId ? `${districts?.find(item => item.district_id === districtId)?.district_name}, ` : ""}${province ?`${provinces?.find(item => item.province_id === province)?.province_name}` : ""}`} />

            </div>
        </div>
    )
}

export default memo(Address);