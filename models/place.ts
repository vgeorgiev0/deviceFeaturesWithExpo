class Place {
  title: string;
  imageUri: string;
  address: string;
  location: { lng: string; lat: string };
  id: string;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: {
      lng: string;
      lat: string;
    }
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
