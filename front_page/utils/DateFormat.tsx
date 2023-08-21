export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffInMilliseconds = today.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
      const day = date.getDate();
      return `${month}월 ${day}일`;
    }
  };