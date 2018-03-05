import React, { Component } from "react";
import "./App.css";
import "./semantic/dist/semantic.min.css";
import "./Custom.css";
// Components
import Navigation from "./Navigation";
import {
  Sidebar,
  Segment,
  Menu,
  Icon,
  Header,
  Feed,
  Comment
} from "semantic-ui-react";

class App extends Component {
  state = {
    expandComments: true
  }

  getRandomPhoto() {
    let animals = ["cat", "dog", "monkey", "ape", "squirrel", "beaver"];
    const randAnimal = animals[Math.floor(Math.random() * animals.length)];
    return `https://api.adorable.io/avatars/35/${randAnimal}.png`;
  }
  render() {
    const self = this;
    return (
      <div>
        <Navigation />
        <Sidebar.Pushable as={Segment} className="my-side-bar">
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={true}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="home">
              <Icon name="home" />
              All
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Icon name="react" />
              React
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              Redux
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              Udacity
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher className="post-content">
            <Segment basic>
              <Header as="h3">Application Content</Header>
              <Feed size="large">
                <Feed.Event>
                  <div className="feed-actions"><a><Icon name='edit'/></a><a><Icon name='delete'/></a></div>
                  <Feed.Label
                    image={this.getRandomPhoto()}
                    children={
                      <div>
                        <img alt="" src={self.getRandomPhoto()} />
                        <div className="voting">
                          <Icon name="triangle up" />
                          <div className="count">
                            <Icon name="thumbs up" />2
                          </div>
                          <Icon name="triangle down" />
                        </div>
                      </div>
                    }
                  />
                  <Feed.Content>
                    <Feed.Summary>
                      Joe Henderson posted
                      <Feed.Date>3 days ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                      <a>
                        <h3>Comments</h3>
                      </a>
                      Ours is a life of constant reruns. We're always circling
                      back to where we'd we started, then starting all over
                      again. Even if we don't run extra laps that day, we surely
                      will come back for more of the same another day soon.
                    </Feed.Extra>

                    <Comment.Group>
                      <Header as="h4" dividing>
                        4 Comments <a className="more" onClick={() => this.setState({expandComments: !this.state.expandComments})}>...more</a>
                      </Header>

                      <Comment>
                        <div className="voting">
                          <Icon name="triangle up" />
                          <div className="count">
                            <Icon name="thumbs up" />2
                          </div>
                          <Icon name="triangle down" />
                        </div>
                        <Comment.Avatar src={this.getRandomPhoto()} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                          </Comment.Metadata>
                          <Comment.Text>How artistic!</Comment.Text>
                          <Comment.Actions>
                            <Comment.Action children={<Icon name='edit'/>}/>
                            <Comment.Action children={<Icon name='delete'/>}/>
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>

                      <Comment collapsed={this.state.expandComments}>
                        <div className="voting">
                          <Icon name="triangle up" />
                          <div className="count">
                            <Icon name="thumbs up" />2
                          </div>
                          <Icon name="triangle down" />
                        </div>
                        <Comment.Avatar src={this.getRandomPhoto()} />
                        <Comment.Content>
                          <Comment.Author as="a">Matt</Comment.Author>
                          <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                          </Comment.Metadata>
                          <Comment.Text>How artistic!</Comment.Text>
                          <Comment.Actions>
                            <Comment.Action children={<Icon name='edit'/>}/>
                            <Comment.Action children={<Icon name='delete'/>}/>
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>

                      <Comment collapsed={this.state.expandComments}>
                        <Comment.Avatar src={this.getRandomPhoto()} />
                        <Comment.Content>
                          <Comment.Author as="a">Elliot Fu</Comment.Author>
                          <Comment.Metadata>
                            <div>Yesterday at 12:30AM</div>
                          </Comment.Metadata>
                          <Comment.Text>
                            <p>
                              This has been very useful for my research. Thanks
                              as well! This has been very useful for my
                              research. Thanks as well! This has been very
                              useful for my research. Thanks as well!
                            </p>
                          </Comment.Text>
                          <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>

                      <Comment collapsed={this.state.expandComments}>
                        <Comment.Avatar src={this.getRandomPhoto()} />
                        <Comment.Content>
                          <Comment.Author as="a">Joe Henderson</Comment.Author>
                          <Comment.Metadata>
                            <div>5 days ago</div>
                          </Comment.Metadata>
                          <Comment.Text>
                            Dude, this is awesome. Thanks so much
                          </Comment.Text>
                          <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image={this.getRandomPhoto()} />
                  <Feed.Content>
                    <Feed.Summary>
                      <a>Joe Henderson</a> posted on his page
                      <Feed.Date>3 days ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                      Ours is a life of constant reruns. We're always circling
                      back to where we'd we started, then starting all over
                      again. Even if we don't run extra laps that day, we surely
                      will come back for more of the same another day soon.
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name="like" />
                        5 Likes
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
