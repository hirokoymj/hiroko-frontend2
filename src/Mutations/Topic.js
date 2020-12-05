import gql from "graphql-tag";

export const CREATE_TOPIC = gql`
  mutation CreateTopic($input: TopicInput!) {
    createTopic(input: { topic: $input }) {
      topic {
        nodeId
        id
        categoryId
        subcategoryId
        title
        url
      }
    }
  }
`;

export const DELETE_TOPIC_BY_ID = gql`
  mutation DeleteTopicById($topicId: DeleteTopicByIdInput!) {
    deleteTopicById(input: $topicId) {
      topic {
        id
        title
        url
      }
    }
  }
`;
