import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import './styles/Home_Farm.css';
import AddInventory from './AddInventory';

function EditInventoryItem() {
    const location = useLocation();
    const itemId = location.state?.itemId;
    const title = location.state?.title;
    const gram = location.state?.gram;

    const navigate = useNavigate();

    // location에서 가져온 정보로 아이템 상태를 초기화합니다.
    const [item, setItem] = useState({
        title: title || '',
        gram: gram || ''
    });

    const handleUpdate = () => {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjkxNTczMTUwLCJleHAiOjU0MjQwNTMxNTB9.FZimhlaTengZe-GN3433woPLkiyvGuyPoC6-d2BLROA";

        axios.patch(`/item/${itemId}`, item, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.data) {
                    alert('농작물 정보가 성공적으로 수정되었습니다.');
                    navigate(-1);
                } else {
                    alert('농작물 정보 수정에 실패하였습니다. 다시 시도해 주세요.');
                }
            })
            .catch(error => {
                console.error("농작물 정보 수정 중 오류가 발생했습니다:", error);
                alert('농작물 정보 수정 중 오류가 발생했습니다.');
            });
    };


    return (
        <>
            <Header />
            <div className="profileInfoContainer">
            <div className='inventoryBox'>
                <h2>{title ? `${title} 수정하기` : '농작물 수정하기'}</h2>
                <hr />
                <div>
                    <label>
                        작물명:
                        <input
                            type="text"
                            value={item.title}
                            onChange={e => setItem(prev => ({ ...prev, title: e.target.value }))}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        무게 (단위: g):
                        <input
                            type="number"
                            value={item.gram}
                            onChange={e => setItem(prev => ({ ...prev, gram: Number(e.target.value) }))}
                        />
                    </label>
                </div>
                <br />
                <button onClick={handleUpdate}>수정하기</button>
                </div>
            </div>
        </>
    );
}

export default EditInventoryItem;