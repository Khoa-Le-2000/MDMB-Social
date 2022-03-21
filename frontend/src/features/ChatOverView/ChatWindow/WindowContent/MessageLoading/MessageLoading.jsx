import React from "react";
import './MessageLoading.scss';
import styled from 'styled-components';

function MessageLoading() {
    return (
        // loading html and css
        <div class="loading">
            <div class="box">
                <div class="container">
                    <span class="circle"></span>
                    <span class="circle"></span>
                    <span class="circle"></span>
                    <span class="circle"></span>
                </div>
            </div>
        </div>
    );
}


export default MessageLoading;