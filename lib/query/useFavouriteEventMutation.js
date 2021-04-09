import { useMutation } from 'react-query';

import api from 'lib/ApiClient';

export default function useFavouriteEventMutation(queryClient) {
  return useMutation(
    (id) => api.post(`/api/attendee/favourite-event?eventId=${id}`),
    {
      onSuccess: (resp) =>
        queryClient.setQueryData('attendeeFavEvents', resp.data),
    }
  );
}
