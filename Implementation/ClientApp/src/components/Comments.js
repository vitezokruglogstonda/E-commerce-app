import React, { useState, useEffect, useContext, createContext } from "react";
import  Card from './Card'
import  Markdown from './Markdown'
import TextArea from "react-textarea-autosize";
import styled from 'styled-components'
import { authHeader } from '../helpers';
import axios from "axios";

const CommentContext = createContext({});

function gen_comments(comments, colorindex, path) {
    return comments.map((comment, i) => {
      return (
        <Comment
          username={comment.username}
          text={comment.text}
          colorindex={colorindex}
          key={i}
          path={[...path, i]}
          comments={comment.comments}
        />
      );
    });
}

function compare(a1, a2) {
    if (JSON.stringify(a1) === JSON.stringify(a2)) {
      return true;
    }
    return false;
}


function Reply({idProiz}) {
    const [text, setText] = useState("");
    const dodajKometar = () => {
        const KomentarZahtev = {
            Sadrzaj:text,
            ProizvodID:idProiz,
            KomenatarId:null
        }
        axios.post('https://localhost:5001/Posetilac/DodajKomentar',
        KomentarZahtev,
            {
                headers: authHeader()
            }
        ).then(resp => {
            console.log(resp.data);
        }).catch(error => {
            console.error('There was an error!', error);
            console.log(error.data);
        })
    }
    return (
        <div>
        <TextArea
        placeholder="What are your thoughts?"
        minRows={2}
        defaultValue={text}
        onChange={value => {
          setText(value.target.value);
        }}
      />
      <div className="panel">
            <button className="btn">COMMENT</button>
        </div>
      </div>
    )
}
Reply = styled(Reply)`
  border-radius: 8px;
  border: solid 1px hsl(150, 50%, 35%);
  overflow: hidden;

  &.hidden {
    display: none;
  }

  textarea {
    font-family: inherit;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    resize: none;

   
    padding: 12px;
    
    border: none;
    max-width: 100%;
    min-width: 100%;
  }

  .panel {
    display: flex;
    align-items: center;
    background:hsl(150, 51%, 65%);
    padding: 8px;

    .comment_as {
      font-size: 14px;
      color: #cccccc;
      margin-right: 8px;

      .username {
        display: inline-block;
        color: #4f9eed;
      }
    }

    button {
      font-size: 14px;
      margin-left: auto;
    }
  }
`;

const Comments = ({idProiz}) => {
    var [replying, setReplying] = useState([]);
    var [comments, setComments] = useState([
        {
          username: "Kevin",
          text: "#Hello\n>quote\n\n`code`",
          comments: [
            {
              username: "Kevin",
              
              text: "^ click the minimize button to hide threads",
              
              comments: [
                {
                  username: "Kevin",
                  
                  text: "<- Click the arrows to vote",
                  
                  comments: []
                }
              ]
            },
            {
              username: "Kevin",
              
              text: "click on reply to open up a text prompt",
              
              comments: []
            },
            {
              username: "Kevin",
              
              text: "click on reply to open up a text prompt",
             
              comments: []
            },
            {
              username: "Kevin",
              date: "4 hours ago",
              text: "click on reply to open up a text prompt",
              votes: 5,
              comments: []
            },
            {
              username: "Kevin",
              date: "10 mins ago",
              text: "this",
              votes: 2,
              comments: [
                {
                  username: "Kevin",
                 
                  text: "is",
                  
                  comments: [
                    {
                      username: "Kevin",
                      
                      text: "to",
                     
                      comments: [
                        {
                          username: "Kevin",
                          date: "4 mins ago",
                          text: "show",
                          votes: -1,
                          comments: [
                            {
                              username: "Kevin",
                              
                              text: "nesting",
                              
                              comments: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]);



  return (
    <Card >
    <span id="comments">Comments</span>
    <span id="comments_count">(9)</span>
    <Reply idProiz={idProiz}/>
    {/*<CommentContext.Provider value={[replying, setReplying]}>
        {gen_comments(comments, 0, [])}
  </CommentContext.Provider>*/}
    </Card>
  )
}

export default styled(Comments)`
  max-width: 100%;
  min-width: min-content;

  > * {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0px;
    }
  }

  #comments,
  #comments_count {
    font-weight: 100;
    font-size: 20px;
    display: inline-block;
    margin-right: 4px;
    margin-bottom: 8px;
  }

`;

function Comment(props) {
    const [replying, setReplying] = useContext(CommentContext);
    const [minimized, setMinimized] = useState(false);
    const [hidden, setHidden] = useState(false);
  
    useEffect(
      async () => {
        if (props.path.length > 2 && props.path.length % 2 === 0) {
          setHidden(true);
        }
        if (props.path[props.path.length - 1] > 3) {
          setHidden(true);
        }
      },
      [props.path]
    );
  
    return (
      <div {...props}>
        {hidden ? (
          <button
            id="showMore"
            onClick={() => {
              setHidden(false);
            }}
          >
            Show More Replies
          </button>
        ) : (
          <>
            <div id="right">
              <div id="top">
                <span
                  className="minimize"
                  onClick={() => {
                    setMinimized(!minimized);
                  }}
                >
                  [{minimized ? "+" : "-"}]
                </span>
                <span id="username">
                  <a href="">{props.username}</a>
                </span>
              </div>
              <div id="content" className={minimized ? "hidden" : ""}>
                <Markdown options={{ forceBlock: true }}>{props.text}</Markdown>
              </div>
              <div id="actions" className={minimized ? "hidden" : ""}>
                <span
                  className={`${compare(replying, props.path) ? "selected" : ""}`}
                  onClick={() => {
                    if (compare(replying, props.path)) {
                      setReplying([]);
                    } else {
                      setReplying(props.path);
                    }
                  }}
                >
                  reply
                </span>
                <span>report</span>
              </div>
              <Reply
                className={
                  compare(replying, props.path) && !minimized ? "" : "hidden"
                }
              />
              <div className={`comments ${minimized ? "hidden" : ""}`}>
                {gen_comments(props.comments, props.colorindex + 1, [
                  ...props.path
                ])}
              </div>
            </div>
          </>
        )}
      </div>
    );
}

Comment = styled(Comment)`
  display: flex;
  text-align: left;
  background: ${props => (props.colorindex % 2 === 0 ? "hsl(150, 51%, 75%)" : "hsl(150, 51%, 65%)")};
  padding: 16px 16px 16px 12px;
  border: 0.1px solid hsl(150, 51%, 80%);
  border-radius: 8px;

  #showMore {
    background: none;
    border: none;
    
    cursor: pointer;
    font-size: 13px;
    text-align: left;

    &:hover {
      text-decoration: underline;
    }
  }

  .comments {
    > * {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0px;
      }
    }

    &.hidden {
      display: none;
    }
  }

  #left {
    text-align: center;
    &.hidden {
      visibility: hidden;
      height: 0;
    }
  }

  #right {
    flex-grow: 1;

    #top {
      .minimize {
        cursor: pointer;
        color: #53626f;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
      }



      > * {
        margin-right: 8px;
      }
    }

    #content {
     

      &.hidden {
        display: none;
      }
    }

    #actions {
      
      margin-bottom: 12px;

      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */

      &.hidden {
        display: none;
      }

      > .selected {
        font-weight: bold;
      }

      > * {
        cursor: pointer;
        margin-right: 8px;
      }
    }
  }

  ${Reply} {
    margin-bottom: 12px;
  }
`;
