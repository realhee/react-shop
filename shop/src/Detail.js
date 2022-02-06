import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

function Detail(props) {
    let history = useHistory();
    let { id } = useParams();

    let 찾은항목 = props.shoes.find((상품)=> {
        return (
            상품.id == id
        )
    })

    // return 구문 빼먹지 말자..!
    return (     
        <div className="container">
            <div className="my-alert2">
                <p>재고가 얼마 남지 않았습니다!</p>
            </div>
            <div className="row">
            <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes" + (parseInt(id)+1) + ".jpg"} width="100%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5">{찾은항목.title}</h4>
                <p>{찾은항목.content}</p>
                <p>{찾은항목.price}원</p>
                <button className="btn btn-danger">주문하기</button>
                <button className="btn btn-danger" onClick={()=> {history.push('/')} }>뒤로가기</button>
            </div>
            </div>
        </div> 
    )
    
}

export default Detail;