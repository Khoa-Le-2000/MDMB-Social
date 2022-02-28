import React from "react";
import './chat.scss';

function Chat() {
    return (
        <div className="chat-main">
            <div className="row no-gutters">
                <div className="col-md-4 border-right">
                    <div className="settings-tray">
                        <img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg"
                            alt="Profile img" />
                        <span className="settings-tray--right">
                            <i className="material-icons">cached</i>
                            <i className="material-icons">message</i>
                            <i className="material-icons">menu</i>
                        </span>
                    </div>
                    <div class="search-box">
                        <div class="input-wrapper">
                            <i class="material-icons">search</i>
                            <input placeholder="Search here" type="text" />
                        </div>
                    </div>
                    <div class="friend-drawer friend-drawer--onhover">
                        <img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                            alt="" />
                        <div class="text">
                            <h6>Robo Cop</h6>
                            <p class="text-muted">Hey, you're arrested!</p>
                        </div>
                        <span class="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div class="friend-drawer friend-drawer--onhover">
                        <img class="profile-image"
                            src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg" alt="" />
                        <div class="text">
                            <h6>Optimus</h6>
                            <p class="text-muted">Wanna grab a beer?</p>
                        </div>
                        <span class="time text-muted small">00:32</span>
                    </div>
                    <hr />
                    <div class="friend-drawer friend-drawer--onhover ">
                        <img class="profile-image"
                            src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/real-terminator.png" alt="" />
                        <div class="text">
                            <h6>Skynet</h6>
                            <p class="text-muted">Seen that canned piece of s?</p>
                        </div>
                        <span class="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div class="friend-drawer friend-drawer--onhover">
                        <img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/termy.jpg" alt="" />
                        <div class="text">
                            <h6>Termy</h6>
                            <p class="text-muted">Im studying spanish...</p>
                        </div>
                        <span class="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div class="friend-drawer friend-drawer--onhover">
                        <img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rick.jpg" alt="" />
                        <div class="text">
                            <h6>Richard</h6>
                            <p class="text-muted">I'm not sure...</p>
                        </div>
                        <span class="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div class="friend-drawer friend-drawer--onhover">
                        <img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg"
                            alt="" />
                        <div class="text">
                            <h6>XXXXX</h6>
                            <p class="text-muted">Hi, wanna see something?</p>
                        </div>
                        <span class="time text-muted small">13:21</span>
                    </div>
                    <hr />
                    <div class="friend-drawer friend-drawer--onhover">
                        <img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/rachel.jpeg"
                            alt="" />
                        <div class="text">
                            <h6>XXXXX</h6>
                            <p class="text-muted">Hi, wanna see something?</p>
                        </div>
                        <span class="time text-muted small">13:21</span>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="settings-tray">
                        <div class="friend-drawer no-gutters friend-drawer--grey">
                            <div class="flex">
                                <img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
                                    alt="" />
                                <div class="text">
                                    <h6>Robo Cop</h6>
                                    <p class="text-muted">Layin' down...</p>
                                </div>
                            </div>
                            <span class="settings-tray--right">
                                <i class="material-icons">cached</i>
                                <i class="material-icons">message</i>
                                <i class="material-icons">menu</i>
                            </span>
                        </div>
                    </div>
                    <div class="chat-panel">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="chat-bubble">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, vero nostrum veniam aperiam quidem explicabo rem suscipit, cupiditate consectetur blanditiis ab assumenda veritatis natus atque voluptatem ut fugit hic pariatur!
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="chat-bubble chat-bubble--right">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, vero nostrum veniam aperiam quidem explicabo rem suscipit, cupiditate consectetur blanditiis ab assumenda veritatis natus atque voluptatem ut fugit hic pariatur!
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="chat-bubble">
                                    Haalo!
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="chat-bubble chat-bubble--right">
                                    Haalo!
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="chat-bubble chat-bubble--right no-margin-top">
                                    Haalo!
                                </div>
                            </div>
                        </div>
{/* 
                        <div class="row no-gutters">
                            <div class="col-md-3">
                                <div class="chat-bubble chat-bubble--left">
                                    Hello dude! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos enim distinctio fugiat, est, architecto consequuntur veritatis accusamus saepe ab odit sit nesciunt eos? Et ducimus error iusto nostrum officiis.
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <div class="col-md-3 offset-md-9">
                                <div class="chat-bubble chat-bubble--right">
                                    Hello dude Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt at ab optio, aut ut tempora commodi harum debitis vero fugiat deserunt sapiente, officia exercitationem sed. Modi rerum voluptatibus distinctio eos.!
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <div class="col-md-3 offset-md-9">
                                <div class="chat-bubble chat-bubble--right">
                                    Hello dude!
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <div class="col-md-3">
                                <div class="chat-bubble chat-bubble--left">
                                    Hello dude!
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <div class="col-md-3">
                                <div class="chat-bubble chat-bubble--left">
                                    Hello dude!
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <div class="col-md-3">
                                <div class="chat-bubble chat-bubble--left">
                                    Hello dude!
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <div class="col-md-3 offset-md-9">
                                <div class="chat-bubble chat-bubble--right">
                                    Hello dude!
                                </div>
                            </div>
                        </div> */}
                        {/* <div class="row">
                            <div class="col-12"> */}
                                <div class="chat-box-tray">
                                    <i class="material-icons">sentiment_very_satisfied</i>
                                    <input type="text" />
                                    <i class="material-icons">mic</i>
                                    <i class="material-icons">send</i>
                                </div>
                            {/* </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;