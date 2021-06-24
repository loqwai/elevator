{
  init: function(elevators, floors) {
    let hellevators = new Set()
    User.prototype._pressFloorButton = User.prototype.pressFloorButton

    User.prototype.pressFloorButton = function () {
      console.log('user', this, arguments)
      this.trigger('exited_elevator', this)
      return this._pressFloorButton.apply(this, arguments)
    }

    Movable.prototype.makeSureNotBusy = () => { }
    Elevator.prototype._userEntering = Elevator.prototype._userEntering ?? Elevator.prototype.userEntering
    Elevator.prototype.userEntering = function (user) {
      hellevators.add(this)
      return this._userEntering(user)
    }

    const queue = []
    let lock = false
    const teleport = (floorNum) => {
      if (floorNum !== undefined) queue.push(floorNum)
      if (lock) return;

      lock = true
      setTimeout(() => {
        lock = false;
        const destinationFloor = queue.shift()
        if (destinationFloor === undefined) return;

        hellevators.forEach(hellevator => {
          hellevator.goToFloor(destinationFloor)
          hellevator.y = hellevator.destinationY
          hellevator.moveCount = 0
        })

        teleport()
      }, 1)
    }

    floors.forEach(floor => {
      floor.on('up_button_pressed', () => teleport(floor.floorNum()))
      floor.on('down_button_pressed', () => teleport(floor.floorNum()))
    })

    elevators.forEach(e => {
      e.on('floor_button_pressed', teleport)
    })
  },
  update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
  },
}