# Tap

A React “guess the song” webapp. Here users create challenges by uploading recordings of themselves singing a particular song and other users have to select the right answer (the song title) from multiple options. This webapp divides users into 2 types: creators and challengers. Creators create the challenges and challengers solve these challenges. Note that the user roles challenger and creator are not mutually exclusive both roles can be associated with one user.

### Functional Requirements
| ID | Name                  | Description                                                             |
|----|-----------------------|-------------------------------------------------------------------------|
| 1  | CREATEACCOUNT         | User shall be able to create an account                                 |
| 2  | LOGIN                 | User shall can using social media or email                              |
| 3  | VIEWPROFILE           | The user can view their profile or profiles of other users              |
| 4  | CREATECHALLENGE       | User shall create a challenge.                                          |
| 5  | RECORDAUDIO           | User can record an audio snippet for a maximum of 15 seconds            |
| 6  | PLAYBACK AUDIO        | User can playback recorded audio                                        |
| 7  | PLAYCHALLENGE         | User can play a challenge                                               |
| 8  | EDITCHALLENGE         | User shall edit a challenge they created                                |
| 9  | DELETECHALLENGE       | User shall delete a challenge they created                              |
| 10 | VIEWCREATEDCHALLENGES | User can view a list of the challenges they created                     |
| 11 | LIKECHALLENGE         | Use can like or unlike a challenge                                      |
| 12 | VIEWLIKEDCHALLENGES   | User can view a list of challenges that they liked                      |
| 13 | SETPRIVACY            | User shall be able to set their created challenges to private or public |
| 14 | GETHINTS              | User shall be able to add hints                                         |
| 15 | FOLLOWUNFOLLOW        | User can follow another user or unfollow them.                          |
| 16 | SEARCH                | User can search for challenges by the labels assigned or other users    |
