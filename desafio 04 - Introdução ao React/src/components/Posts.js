import React, { Component } from "react";

import PostsList from "./PostsList";

class Posts extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Júlio Alcantara",
          avatar: "./uploads/profileuser0.png"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "./uploads/profilediego.png"
            },
            content:
              "A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentário é real)"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Gabriel Lisboa",
          avatar: "./uploads/profileuser1.png"
        },
        date: "04 Jun 2019",
        content:
          "Fala galera, beleza?\n\nEstou fazendo o Bootcamp GoStack da Rocketseat e está sendo muito massa! Alguém mais aí fazendo, comenta na publicação para trocarmos uma ideia.",
        comments: [
          {
            id: 2,
            author: {
              name: "Clara Lisboa",
              avatar: "./uploads/profileuser2.png"
            },
            content:
              "Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios contruída!"
          },
          {
            id: 3,
            author: {
              name: "Cézar Toledo",
              avatar: "./uploads/profileuser3.png"
            },
            content:
              "Que maaaaassa! Estou pensando em me inscrever na próxima turma pra ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes!"
          }
        ]
      }
    ]
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="postlist">
        {posts.map(post => (
          <PostsList key={post.id} {...post} />
        ))}
      </div>
    );
  }
}

export default Posts;
