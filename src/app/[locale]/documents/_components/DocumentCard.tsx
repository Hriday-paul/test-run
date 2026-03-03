
import { getLocale, getTranslations } from 'next-intl/server';
import { FaRegFilePdf, FaRegFileWord } from 'react-icons/fa';
import { PiFilesDuotone } from 'react-icons/pi';

async function DocumentCard({ document }: { document: { e_name: string, b_name: string, doc_path: string, pdf_path: string } }) {

    const locale = await getLocale();
    const t = await getTranslations("documents.main.btn")

    return (
        <div className="p-6 border border-stroke bg-white rounded-lg space-y-4">
            <div className="flex items-start gap-3">
                <PiFilesDuotone size={80} />
            </div>

            <h3 className="text-xl font-popin font-medium text-foreground">{locale === "bn" ? document?.b_name : document?.e_name}</h3>

            <div className='flex flex-row gap-x-2 items-center w-full'>
                <a href={document?.doc_path} download={true} className='w-full'>
                    <button className="w-full bg-primary hover:bg-primary/80 duration-150 text-white py-2 cursor-pointer text-center font-popin rounded-md px-2 flex flex-row gap-x-1 justify-center items-center text-sm font-normal">
                        <FaRegFileWord />
                        {t("docx")}
                    </button>
                </a>
                <a href={document?.pdf_path} download={true} className='w-full'>
                    <button className="w-full bg-primary hover:bg-primary/80 duration-150 text-white text-sm font-normal py-2 cursor-pointer text-center font-popin rounded-md px-2 flex flex-row justify-center gap-x-1 items-center">
                        <FaRegFilePdf />
                        {t("pdf")}
                    </button>
                </a>
            </div>
        </div>
    )
}

export default DocumentCard