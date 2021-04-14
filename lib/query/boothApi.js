import api from 'lib/ApiClient';

export async function getAllSellerProfiles() {
    console.log('getting all booths');
    try {
        const { data } = await api.get(`/api/sellerProfile/all`);
        console.log('printing data');
        console.log(data);
        return data;
    }
    catch (e) {
        console.log('error in fetching data');
        console.log(e);
    }
};


export async function getAllSellerProfilesByPartner(id) {
    try {
        // console.log(id);
        const { data } = await api.get(`/api/sellerProfile/bp/${id}`)
        return data;
    }
    catch (e) {
        console.log('error in fetching data');
        console.log(e);
    }
}

export async function getSellerProfile(id) {
    const { data } = await api.get(`/api/sellerProfile/${id}`);
    return data;
}

export async function getBoothsBySellerProfile(id) {
    const { data } = await api.get(`/api/booth/sellerProfile/${id}`);
    return data;
}

export async function updateSellerProfileDescription(id,description) {
    const { data } = await api.post(`/api/sellerProfile/update/${id}`, description);
    return data;
}


export async function uploadBrochure(data) {
    // data.append('file', file);
    api
      // .post('/api/uploadFile', data, {
      .post('/api/sellerProfile/uploadBrochure', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: () => {
          //   queryClient.invalidateQueries(['user', user?.id.toString()]);
          console.log('successfully uploaded i think?');
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          console.log('file upload sucessfully');
          console.log(response);
          console.log(response.data['fileDownloadUri']);
          var newlink = response.data['fileDownloadUri'];
          //   setProfilepicUrl(newlink);
        }
      })
      .catch((e) => {
        // setShowFailedMsg(true);
        console.log('error caught');
        console.log(e);
      });
  }

  export async function removeBrochureMethod(id, imageUrl) { //returns the new list of brochures
    console.log('lmao in remove method');
    const { data } = await api.post(
      `/api/sellerProfile/remove-brochure?id=${id}&imageUrl=${imageUrl}`
    );
    return data;
  }