using Moq;
using Watch2Gether_Backend.Model;
using WatchWithFriends.Services;
using WatchWithFriends_Data.Model;
using WatchWithFriends_Data.Repositories;
using Xunit;

namespace WatchWithFriends_Tests.Services
{
    public class RoomServiceTests
    {
        private readonly Mock<IRoomRepository> _mockRoomRepository = new Mock<IRoomRepository>();
        private readonly Mock<IUserRepository> _mockUserRepository = new Mock<IUserRepository>();
        private readonly Mock<IRoomUserRepository> _mockRoomUserRepository = new Mock<IRoomUserRepository>();
        private readonly Mock<IVideoRepository> _mockVideoRepository = new Mock<IVideoRepository>();


        [Fact]
        public async Task JoinRoom_RoomOrUserDoesNotExist_ReturnsNull()
        {
            // Arrange
            var service = new RoomService(
                                            _mockRoomRepository.Object,
                                            _mockUserRepository.Object,
                                            _mockRoomUserRepository.Object,
                                            _mockVideoRepository.Object
                                          );
            _mockRoomRepository.Setup(repo => repo.GetRoomByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Room)null);
            // Same for user repository if needed

            // Act
            var result = await service.JoinRoom(Guid.NewGuid(), Guid.NewGuid(), "contextId", "name");

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task JoinRoom_Success_ReturnsRoomDTO()
        {
            // Arrange
            var expectedRoom = new Room(); // Setup with necessary properties
            _mockRoomRepository.Setup(repo => repo.GetRoomByIdAsync(It.IsAny<Guid>())).ReturnsAsync(expectedRoom);
            _mockUserRepository.Setup(repo => repo.GetUserByIdAsync(It.IsAny<Guid>())).ReturnsAsync(new User());
            _mockRoomUserRepository.Setup(repo => repo.InsertRoomUserAsync(It.IsAny<RoomUser>())).Returns(Task.CompletedTask);

            var service = new RoomService(
                                            _mockRoomRepository.Object,
                                            _mockUserRepository.Object,
                                            _mockRoomUserRepository.Object,
                                            _mockVideoRepository.Object
                                          );

            // Act
            var result = await service.JoinRoom(Guid.NewGuid(), Guid.NewGuid(), "contextId", "name");

            // Assert
            Assert.NotNull(result);
            // Further assertions about the RoomDTO properties can be made here
        }
        [Fact]
        public async Task DisconnectRoom_RoomUserDoesNotExist_ReturnsNull()
        {
            // Arrange
            _mockRoomUserRepository.Setup(repo => repo.DeleteRoomUserAsync(It.IsAny<string>())).ReturnsAsync((RoomUser)null);

            var service = new RoomService(
                                            _mockRoomRepository.Object,
                                            _mockUserRepository.Object,
                                            _mockRoomUserRepository.Object,
                                            _mockVideoRepository.Object
                                          );

            // Act
            var result = await service.DisconnectRoom("roomUserId");

            // Assert
            Assert.Null(result);
        }
        [Fact]
        public async Task NextVideo_WithValidRoomAndVideos_UpdatesCurrentVideo()
        {
            // Arrange
            var roomId = Guid.NewGuid();
            var initialCurrentVideoId = Guid.NewGuid();
            var nextVideoId = Guid.NewGuid();
            var currentPlayList = new List<Video>
            {
                new Video { Id = initialCurrentVideoId, Title = "Initial Video", Url = "http://example.com/initial", Image = "http://example.com/initial.jpg" },
                new Video { Id = nextVideoId, Title = "Next Video", Url = "http://example.com/next", Image = "http://example.com/next.jpg" } 
            };
            var expectedRoom = new Room
            {
                Id = roomId,
                CurrentVideo = initialCurrentVideoId,
                PlayList = currentPlayList
               
            };
            _mockRoomRepository.Setup(repo => repo.GetRoomByIdAsync(roomId)).ReturnsAsync(expectedRoom);
            _mockVideoRepository.Setup(repo => repo.DeleteVideoAsync(initialCurrentVideoId))
                    .ReturnsAsync(currentPlayList[0]); 

            var service = new RoomService(_mockRoomRepository.Object, _mockUserRepository.Object, _mockRoomUserRepository.Object, _mockVideoRepository.Object);

            // Act
            var result = await service.NextVideo(roomId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(nextVideoId, result.CurrentVideo); // Verify the current video has been updated to the next video
            _mockRoomRepository.Verify(repo => repo.UpdateRoomAsync(It.Is<Room>(room => room.CurrentVideo == nextVideoId)), Times.Once());
        }
    }
}
