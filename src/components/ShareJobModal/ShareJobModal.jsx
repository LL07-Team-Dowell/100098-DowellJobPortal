import { AiOutlineClose, AiOutlineLink } from 'react-icons/ai';
import styles from './styles.module.css';
import { IoCopyOutline, IoLogoWhatsapp } from 'react-icons/io5';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { generatePublicJobLink } from '../../services/adminServices';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useJobContext } from '../../contexts/Jobs';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ShareJobModal = ({ linkToShareObj, handleCloseModal }) => {

    const [ copyOptionActive, setCopyOptionActive ] = useState(false);
    const [ activeItemId, setActiveItemId ] = useState(null);
    const [ mouseOverShareLinkContainer, setMouseOverShareLinkContainer ] = useState(false);
    const [ linkToDisplay, setLinkToDisplay ] = useState('');
    const [ linkGenerated, setLinkGenerated ] = useState(false);
    const [ linkLoading, setLinkLoading ] = useState(false);
    const { currentUser } = useCurrentUserContext();
    const [ publicIds, setPublicIds ] = useState([]);
    const [ maximumNumberOfPublicIds, setMaximumNumberOfPublicIds ] = useState(0);
    const [ publicIdsSelected, setPublicIdsSelected ] = useState([]);
    const [ qrCodeImage, setQrCodeImage ] = useState('');
    const selectItemRef = useRef();
    const { jobLinks, setJobLinks } = useJobContext();

    useEffect(() => {

        if (!currentUser) return

        const publicIdsToSet = currentUser?.userportfolio?.filter(portfolio => portfolio.member_type === 'public');

        setPublicIds(publicIdsToSet)
        setMaximumNumberOfPublicIds(Math.max(...publicIdsToSet.map(item => item.username.length)));

    }, [])

    const handleShareItem = async (optionPassed) => {
        // console.log(linkToShare);

        switch (optionPassed?.type) {
            case 'facebook':
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${linkToDisplay}`,
                    '_blank'
                )
                handleCloseModal();
                break;
            case 'twitter':
                window.open(
                    `https://twitter.com/intent/tweet?text=${linkToDisplay}`,
                    '_blank'
                )
                handleCloseModal();
                break;
            case 'whatsapp':
                window.open(
                    `https://api.whatsapp.com/send?&text=${linkToDisplay}`,
                    '_blank'
                )
                handleCloseModal();
                break;
            case 'link':
                setActiveItemId(optionPassed._id);
                setCopyOptionActive(true);
                break;
            default:
                console.log('Invalid action passed');
                handleCloseModal();
                break;
        }
        
    }

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(decodeURIComponent(linkToDisplay));
        toast.success('Link copied to clipboard!')
        handleCloseModal();
    }

    const handleItemClick = async (item) => {
        const [currentIdsSelected, itemAlreadySelected ] = [
            publicIdsSelected.slice(),
            publicIdsSelected.find(id => id === item),
        ];

        selectItemRef.current.value = '';
        
        if (itemAlreadySelected) {
            setPublicIdsSelected(currentIdsSelected.filter(id => id !== itemAlreadySelected));
            return
        }

        currentIdsSelected.push(item);
        setPublicIdsSelected(currentIdsSelected);
    }

    const handleGenerateLink = async () => {
        const dataToPost = {
            "qr_ids": publicIdsSelected,
            "job_company_id": linkToShareObj?.job_company_id,
            "job_id": linkToShareObj?.job_id,
            "company_data_type": linkToShareObj?.company_data_type,
        }

        const currentJobLinks = jobLinks.slice();

        setLinkLoading(true);

        try {
            const response = (await generatePublicJobLink(dataToPost)).data;
            // console.log(response);
            setQrCodeImage(response.qr_code);
            setLinkToDisplay(response.master_link);
            setLinkGenerated(true);

            currentJobLinks.push(response.master_link);
            setJobLinks(currentJobLinks);
        } catch (error) {
            console.log(error.response ? error.response.data: error.message);
            toast.info(error.response ? error.response.data: error.message);
        }

        setLinkLoading(false);
    }

    return <>
        <div className={styles.share__Overlay}>
            <div className={styles.share__Modal}>
                <div className={styles.share__Modal__CLose__Container}>
                    <AiOutlineClose 
                        className={styles.share__Modal__CLose__Icon} 
                        onClick={handleCloseModal}
                    />
                </div>
                <div>
                    <h2>Share Job</h2>
                    <p className={styles.share__Subtitle__Info}>
                        {
                            !linkGenerated ?
                            "Generate a link for this job to share to other platforms"
                            :
                            "Share a link for this job to other platforms for people to apply"
                        }
                    </p>
                </div>
                {
                    !linkGenerated ? <>
                        <div className={styles.select__Items__Wrapper}>
                            <p className={styles.select__Items__Text}>
                                <span>Select number of public links</span>
                                <span className={styles.indicator}>Count: {publicIdsSelected.length}</span>
                            </p>
                            <select
                                className={styles.select__Item}
                                ref={selectItemRef}
                                size={
                                    maximumNumberOfPublicIds > 10 ? 
                                    10 
                                    : 
                                    maximumNumberOfPublicIds <= 1 ? 
                                    2 
                                    :
                                    maximumNumberOfPublicIds
                                }
                                style={{
                                    pointerEvents: linkLoading ? 'none' : 'all'
                                }}
                            >
                                {
                                    React.Children.toArray(publicIds.map(idItem => {
                                        return <>
                                            <option value="" hidden></option>
                                            {
                                                React.Children.toArray(idItem.username.map(item => {
                                                    return <option 
                                                        onClick={() => handleItemClick(item)}
                                                        className={publicIdsSelected.find(id => id === item) ? styles.active__Item : ''}
                                                    >
                                                        {item}
                                                    </option>
                                                }))
                                            }
                                        </>
                                    }))
                                }
                            </select>
                        </div>
                        <button 
                            className={`${styles.copy__Link__Btn} ${styles.generate__Link__Btn}`}
                            onClick={() => handleGenerateLink()}
                            disabled={linkLoading || publicIdsSelected.length < 1}
                        >
                            {
                                linkLoading ?
                                <LoadingSpinner width={'1rem'} height={'1rem'} color={'#fff'} />
                                : 
                                'Generate link'
                            }
                        </button> 
                    </> 
                    : 
                    
                    <>
                        <div className={styles.qr__code__Item}>
                            <img src={qrCodeImage} alt='job qr code' />
                        </div>
                        <ul className={styles.share__Items__Container}>
                            {
                                React.Children.toArray(shareOptions.map(option => {
                                    return <>
                                        <li 
                                            onClick={() => handleShareItem(option)}
                                            className={`${styles.share__Item} ${activeItemId === option._id ? styles.active : ''}`}
                                            data-tooltip-id={option._id} 
                                            data-tooltip-content={option.title}
                                        >
                                            <span>{option.icon}</span>
                                        </li>
                                        <Tooltip id={option._id} />
                                    </>
                                }))
                            }
                        </ul>

                        
                        {
                            copyOptionActive && <>
                                <div 
                                    className={styles.link__Wrapper}
                                    onMouseOver={() => setMouseOverShareLinkContainer(true)}
                                    onMouseLeave={() => setMouseOverShareLinkContainer(false)}
                                    onClick={() => handleCopyLink()}
                                >
                                    <pre 
                                        className={styles.link__Content} 
                                    >
                                        <span>{linkToDisplay}</span>
                                    </pre>
                                    { 
                                        mouseOverShareLinkContainer && <div className={styles.copy__Link__Icon}>
                                            <IoCopyOutline />
                                        </div> 
                                    }
                                </div>
                                <button 
                                    className={styles.copy__Link__Btn}
                                    onClick={() => handleCopyLink()}
                                >
                                    Copy
                                </button>    
                            </>
                        }
                    </>
                }
                
            </div>
        </div>
    </>
}


const shareOptions = [
    {
        title: 'Share to Facebook',
        icon: <FaFacebook />,
        type: 'facebook',
        _id: crypto.randomUUID(),
    },
    {
        title: 'Share to Twitter',
        icon: <FaTwitter />,
        type: 'twitter',
        _id: crypto.randomUUID(),
    },
    {
        title: 'Share on WhatsApp',
        icon: <IoLogoWhatsapp />,
        type: 'whatsapp',
        _id: crypto.randomUUID(),
    },
    {
        title: 'Share link',
        icon: <AiOutlineLink />,
        type: 'link',
        _id: crypto.randomUUID(),
    },
]

export default ShareJobModal;
