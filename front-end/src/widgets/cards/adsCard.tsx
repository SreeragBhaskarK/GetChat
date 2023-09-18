import { formatDistanceToNow } from 'date-fns';

export const AdsCard = ({ ads }) => {
    return (
        <>
            <div className='flex flex-col gap-2 bg-white rounded-xl border border-slate-200'>

                <div>
                    <img className='w-full' src={ads.ad_url} />
                </div>

                <div className='mb-4 mx-4'>

                    <p>
                        {ads.ad_name}
                    </p>
                    {/* <span className='text-slate-500 text-sm'>Show all the 164 comments</span> */}
                    <p className='mt-2 text-slate-600 text-xs uppercase'>{formatDistanceToNow(new Date(ads.createdAt), { addSuffix: true })}</p>
                    <p className='w-fit ml-auto'>ads</p>
                </div>
            </div>
        </>
    )
}

export default AdsCard