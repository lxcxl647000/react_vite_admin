import { Card } from 'antd'
import './index.scss'
import bg from '@/assets/welcome.svg'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Home() {
    const { avatar, name } = useSelector((state: RootState) => state.userReducers);
    return (
        <div className='home'>
            <Card className='home_card'>
                <div className="home_card_box">
                    <img className='home_card_box_avatar' src={avatar} alt="avatar" />
                    <div className="home_card_box_info">
                        <p className='home_card_box_info_name'>您好呀，{name}</p>
                        <p className='home_card_box_info_title'>后台管理系统</p>
                    </div>
                </div>
            </Card>
            <div className="home_bg">
                <img className='home_bg_img' src={bg} alt="background-img" />
            </div>
        </div>
    )
}