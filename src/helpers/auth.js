export const getUserFromAuthGoogleUser = googleUser => ({
    id: googleUser.getId(),
    name: googleUser.getName(),
    firstName: googleUser.getGivenName(),
    familyName: googleUser.getFamilyName(),
    imageUrl: googleUser.getImageUrl(),
    email: googleUser.getEmail()
});