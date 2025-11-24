"use client"
import { useServiceDetailsQuery } from '@/redux/api/services.api'
import ErrorComponent from '@/shared/ErrorComponent';
import Loader from '@/shared/Loader';
import Image from 'next/image';
import pdfIcon from "../../../public/pdf.svg"
import { Button, ConfigProvider, Form, FormProps, Input, UploadFile } from 'antd';
import { IRequirement } from '@/redux/types';
import { CloudDownload } from 'lucide-react';
import Dragger from 'antd/es/upload/Dragger';
import { ImSpinner2, ImSpinner3 } from 'react-icons/im';
import { useAddNewOrderMutation } from '@/redux/api/order.api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function ApplyServiceForm({ id }: { id: string }) {
    const { isLoading, isError, isSuccess, data } = useServiceDetailsQuery({ id });

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div>

            <div className="flex items-start gap-2 lg:gap-3 justify-center mb-5">
                <Image src={pdfIcon} alt='pdf icon' height={100} width={1000} className='h-8 lg:h-10 w-auto' />
                <h3 className='text-xl lg:text-3xl text-center font-popin font-semibold text-gray-800'>{data?.data?.name}</h3>
            </div>

            {
                isSuccess && <ApplicationForm requirements={data?.data?.requirements} serviceId={id} />
            }


        </div>
    )
}

export default ApplyServiceForm;

type FieldType = {
    tax_token?: UploadFile[]
    fitness?: UploadFile[]
    registration_certificate?: UploadFile[]
    nid?: UploadFile[]
    education_certificate?: UploadFile[]
    registration_mobile?: string
    chasis_number?: string
    engine_number?: string
    model_number?: string
    old_license?: UploadFile[]
    learner_card?: UploadFile[]
    bluebook_copy?: UploadFile[]
};


const ApplicationForm = ({ requirements, serviceId }: { requirements: IRequirement[], serviceId: string }) => {

    const [OrderService, { isLoading }] = useAddNewOrderMutation();

    const router = useRouter();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {

            const formdata = new FormData();

            const file_fields = requirements?.filter(i => i?.fieldType == "File").map(i => i?.field_name);
            const text_fields = requirements?.filter(i => i?.fieldType == "Text").map(i => i?.field_name);

            file_fields?.forEach(field => {
                const fileList = (values as any)[field]
                if (fileList?.[0]?.originFileObj) {
                    formdata.append(field, fileList[0].originFileObj as File);
                }
            });

            const textData: Record<string, any> = { serviceId };
            text_fields?.forEach(field => {
                if ((values as any)[field] !== undefined) {
                    textData[field] = (values as any)[field];
                }
            });

            formdata.append("data", JSON.stringify(textData));

            const res = await OrderService(formdata).unwrap();

            router.push(res?.data);


        } catch (err: any) {
            Swal.fire({
                title: err?.data?.message || "Something went wrong",
                text: "Some issues happend, try again or wait for some times.",
                customClass: {
                    title: "text-2xl text-black font-figtree",
                    container: "text-sm font-medium font-figtree text-zinc-900",
                    cancelButton: "!bg-primary text-white",
                    confirmButton: "!bg-primary text-white"
                },
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
                confirmButtonText: "Close",
                confirmButtonColor: "#38CB6E",
                cancelButtonText: "Close",
            })
        }
    }

    const customTheme = {
        token: {
            fontFamily: "'popin', sans-serif",
            colorPrimary: "#E20101",
            colorInfo: "#E20101",
            fontWeight: 500,
        },
        components: {
            Layout: {
                bodyBg: "rgb(255,255,255)",
            },
            Form: {
                labelFontSize: 16,
            },
        },
    };

    return (
        <div className='font-popin'>

            <ConfigProvider theme={customTheme}>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={{ weight: 0, pet_status: "available" }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical">

                    {requirements?.map(requirement => {
                        return <>
                            {requirement?.fieldType == "File" ?

                                <Form.Item
                                    name={requirement?.field_name}
                                    label={requirement?.name}
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => {
                                        if (Array.isArray(e)) {
                                            return e;
                                        }
                                        return e?.fileList;
                                    }}
                                    rules={[{ required: requirement?.required, message: "Field is required" }]}
                                >
                                    <Dragger
                                        name="files"
                                        // maxCount={1}
                                        beforeUpload={() => false} // prevents automatic upload
                                        // accept="image/*"
                                        listType="picture"
                                        // multiple
                                        onPreview={() => { }}
                                        showUploadList={{
                                            showPreviewIcon: false,
                                            showRemoveIcon: true,
                                        }}
                                    >
                                        <div className='flex flex-col justify-center'>
                                            <p className="ant-upload-drag-icon flex justify-center">
                                                <CloudDownload size={30} />
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">
                                                Upload required documents
                                            </p>
                                        </div>
                                    </Dragger>
                                </Form.Item>

                                :

                                <Form.Item
                                    name={requirement?.field_name}
                                    label={requirement?.name}
                                    rules={[{ required: requirement?.required, message: "Field is required" }]}>
                                    <Input size="large" placeholder={"Write " + requirement?.name} />
                                </Form.Item>

                            }
                        </>
                    })}

                    <div className='space-y-2 my-5'>
                        <p className='text-sm font-popin font-medium'>[বিশেষ দৃষ্টব্য] :  লিস্টের বাহিরেও যেকোনো কাজের চার্জ আলোচনা সাপেক্ষে এবং উক্ত চার্জ সরকারি ফি ব্যতিত। প্রয়োজনে রানবিডি সরকারি অনলাইন চার্জ প্রদান করে।</p>
                        <p className='text-sm font-popin font-medium'>কোন প্রকার লেনদেন রশিদ ছাড়া করা নিষেধ।</p>
                        <p className='text-sm font-popin font-medium'>রানবিডি নগদ অর্থ গ্রহণ করেনা।</p>
                    </div>


                    <Button htmlType="submit" className='mt-4' type="primary" size="large" block disabled={isLoading} icon={isLoading ? <ImSpinner2 className="animate-spin size-5 text-primary" /> : <></>} iconPosition="end">
                        Submit
                    </Button>


                </Form>

            </ConfigProvider>

        </div>
    )
}