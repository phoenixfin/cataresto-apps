const itActsAsFavoriteRestoModel = (favoriteResto) => {
  it('should return the restaurant that has been added', async () => {
    favoriteResto.putResto({id: 1});
    favoriteResto.putResto({id: 2});

    expect(await favoriteResto.getResto(1)).toEqual({id: 1});
    expect(await favoriteResto.getResto(2)).toEqual({id: 2});
    expect(await favoriteResto.getResto(3)).toEqual(undefined);
  });

  it('should refuse a restaurant from being added ' +
     'if it does not have the correct property', async () => {
    favoriteResto.putResto({aProperty: 'property'});

    expect(await favoriteResto.getAllRestos()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteResto.putResto({id: 1});
    favoriteResto.putResto({id: 2});

    expect(await favoriteResto.getAllRestos()).toEqual([
      {id: 1},
      {id: 2},
    ]);
  });

  it('should remove favorite restaurant', async () => {
    favoriteResto.putResto({id: 1});
    favoriteResto.putResto({id: 2});
    favoriteResto.putResto({id: 3});
    favoriteResto.putResto({id: 4});

    await favoriteResto.deleteResto(3);

    expect(await favoriteResto.getAllRestos()).toEqual([
      {id: 1},
      {id: 2},
      {id: 4},
    ]);
  });

  it('should handle request to remove a restaurant ' +
     'even though the restaurant has not been added', async () => {
    favoriteResto.putResto({id: 1});
    favoriteResto.putResto({id: 2});

    await favoriteResto.deleteResto(5);

    expect(await favoriteResto.getAllRestos()).toEqual([
      {id: 1},
      {id: 2},
    ]);
  });
};

export {itActsAsFavoriteRestoModel};
