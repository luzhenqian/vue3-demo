import { computed, reactive, ref } from "vue";
import {
  create,
  get,
  MessageRaw,
  del as delApi,
  Id,
  update as updateApi,
} from "../api/messagewall";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";

// hook function
export function useMessage(id) {
  const posts = reactive<MessageRaw>([]);
  const keywords = ref<string>("");

  const getMessage = async () => {
    const res = await get({ search: keywords.value });

    posts.length = 0;
    if (id) {
      const result = res.results.find((item) => item.post_id === Number(id));
      res.results = [];
      if (result) {
        res.results.push(result);
      }
    }
    res.results.forEach((item) => {
      posts.push(item);
    });
  };

  const clear = () => {
    keywords.value = "";
    getMessage();
  };

  getMessage();

  const formatPosts = computed<MessageRaw>(() => {
    return posts.map((post) => {
      post.publish_time = dayjs((post.publish_time as number) * 1000).format(
        "YYYY年MM月DD日"
      );
      post.editing = false;
      return post;
    });
  });

  return {
    posts,
    formatPosts,
    reload: getMessage,
    clear,
    keywords,
  };
}

export function usePublish(reload) {
  const publishVisible = ref<boolean>(false);
  const content = ref<string>("");

  const publishStepOne = () => {
    publishVisible.value = true;
  };
  const publishStepTwo = async () => {
    const res = await create({ content: content.value });
    if (res) {
      content.value = "";
      publishVisible.value = false;
      reload();
    }
  };
  const cancelPublish = () => {
    publishVisible.value = false;
  };
  return {
    publishVisible,
    content,
    publishStepOne,
    publishStepTwo,
    cancelPublish,
  };
}

export function useDelete(reload) {
  const del = async (id: Id) => {
    const res = await delApi(id);
    if (res === null) {
      ElMessage({ message: "删除成功", type: "success" });
      reload();
    }
  };
  return { del };
}

export function useUpdate(posts, reload) {
  console.log(posts, "posts");

  const editContent = ref<string>("");
  const updateStepOne = (id: Id) => {
    const current = posts.find((item) => item.post_id === id);
    if (current) {
      posts.forEach((item) => {
        item.editing = false;
      });
      editContent.value = current.content;
      current.editing = true;
    }
  };

  const update = async (id: Id) => {
    const res = await updateApi(id, { content: editContent.value });
    if (res === null) {
      editContent.value = "";
      const current = posts.find((item) => item.post_id === id);
      if (current) {
        current.editing = false;
        reload();
      }
    }
  };

  const cancelUpdate = (id: Id) => {
    const current = posts.find((item) => item.post_id === id);
    if (current) {
      current.editing = false;
    }
  };

  return {
    editContent,
    updateStepOne,
    update,
    cancelUpdate,
  };
}
